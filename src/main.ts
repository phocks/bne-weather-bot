import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import Masto from "https://esm.sh/mastodon@1.2.2";
import wrap from "https://esm.sh/await-to-js@3.0.0";
import urlcat from "https://esm.sh/urlcat@3.1.0";

// Local imports
import * as time from "./utils/time.ts";
import * as variations from "./utils/variations.ts";

console.log("It is hour number:", time.getHour());

const TRIGGER_ROUTE = new URLPattern({
  pathname: "/trigger" + Deno.env.get("TRIGGER_SECRET"),
});

const getWeatherData = async () => {
  // Check we have a key
  if (!Deno.env.get("OPENWEATHER_API_KEY")) {
    throw new Error(
      "No API key found. OpenWeather API key must be set " +
        "in the OPENWEATHER_API_KEY environment variable."
    );
  }

  const lat = "-27.470125";
  const lon = "153.021072";

  type ApiData = {
    lat: string;
    lon: string;
    units: string;
    appid: string | undefined;
  };

  const params: ApiData = {
    lat,
    lon,
    units: "metric",
    appid: Deno.env.get("OPENWEATHER_API_KEY"),
  };

  const apiUrl = urlcat(
    "https://api.openweathermap.org/data/2.5/weather?",
    params
  );

  const [fetchError, response] = await wrap(fetch(apiUrl));

  if (fetchError) {
    console.error(fetchError);
    throw fetchError;
  }

  if (!response.ok) {
    throw new Error("Bad response" + response.statusText);
  }

  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

serve(async (req: Request) => {
  // Let's get the current weather
  const ApiResult = await getWeatherData();

  // Extract weather description
  const weather = ApiResult?.weather[0];

  // What weather did we get?
  const values = {
    locationName: ApiResult?.name,
    mainDescription: weather?.main,
    subDescription: weather?.description,
    tempNow: ApiResult?.main?.temp,
    feelsLike: ApiResult?.main?.feels_like,
    humidityPercent: ApiResult?.main?.humidity,
  };

  console.log(values);

  function subDescriptionFixes(subDescription: string) {
    if (subDescription === "few clouds") return "a few clouds";
    return subDescription;
  }

  // Create our toot
  const toot = `${variations.getGeneralGreetings()} ${variations.getRightNowVariations(
    values.locationName
  )} ${variations.getWeHaveAlts()} ${subDescriptionFixes(
    values.subDescription
  )}. The temperature is ${values.tempNow}°C, and "feels like" ${
    values.feelsLike
  }°C. Humidity is at ${values.humidityPercent}%. ${variations.getSignOff()}`;

  console.log(toot);

  // Check to see if we want to actually toot
  // Enpoint to ping will be https://weatherbot.deno.dev/trigger +
  // whatever is in the TRIGGER_SECRET env var
  const match = TRIGGER_ROUTE.exec(req.url);
  if (match) {
    const mastodonApi = new Masto({
      access_token: Deno.env.get("MASTODON_ACCESS_TOKEN"),
      timeout_ms: 60 * 1000,
      api_url: "https://bne.social/api/v1/",
    });

    const response = await mastodonApi.post("statuses", {
      status: toot,
      visibility: "unlisted",
    });
    console.log(response);

    return Response.json({
      message: "Enpoint matched! Let's toot!",
      weather: ApiResult,
    });
  }

  return Response.json({
    code: "run/success",
    message: "Nothing to do",
    weather: ApiResult,
  });
});

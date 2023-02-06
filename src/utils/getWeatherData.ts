import wrap from "https://esm.sh/await-to-js@3.0.0";
import urlcat from "https://esm.sh/urlcat@3.1.0";

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

export default getWeatherData;

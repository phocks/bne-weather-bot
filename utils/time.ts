import { time } from "https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts";

const getBrisbaneDateObject = () => {
  const timeInBrisbane = time().tz("Australia/Brisbane").t;
  return timeInBrisbane;
};

const getHour = () => {
  const timeInBrisbane = getBrisbaneDateObject();
  return timeInBrisbane.getUTCHours();
};

export { getHour };

import { time } from "https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts";

const getBrisbaneDateObject = () => time().tz("Australia/Brisbane").t;
const getHour = () => getBrisbaneDateObject().getUTCHours();

export { getHour, getBrisbaneDateObject };

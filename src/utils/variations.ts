import getRandomElement from "../lib/getRandomElement.ts";

const getGeneralGreetings = () =>
  getRandomElement([
    "Hi there.",
    "Hello.",
    "Howdy all.",
    "What's up everyone?",
    "Hey friends.",
    "G'day mates!",
  ]);

const getMorningGreetings = () =>
  getRandomElement([
    "Good morning!",
    "Morning!",
    "Top of the morning to ya!",
    "What a morning!",
    "Morning all!",
  ]);

const getAfternoonGreetings = () =>
  getRandomElement([
    "Good afternoon!",
    "Afternoon!",
    "Afternoon all!",
    "Afternoon folks!",
    "Happy arvo mates.",
  ]);

const getEveningGreetings = () =>
  getRandomElement([
    "Good evening!",
    "Evening!",
    "Evening all!",
    "Evening folks!",
    "Good evening everyone.",
  ]);

const getNightGreetings = () =>
  getRandomElement([
    "Good night!",
    "What a night!",
    "Night all!",
    "Night folks!",
    "Good night everyone.",
  ]);

const getTimeBasedGreetings = (time: number) => {
  if (time >= 6 && time < 11) return getMorningGreetings();
  else if (time >= 1 && time < 17) return getAfternoonGreetings();
  else if (time >= 17 && time < 21) return getEveningGreetings();
  else if (time >= 21 && time < 23) return getNightGreetings();
  else return getGeneralGreetings();
};

const getSignOff = () =>
  getRandomElement([
    "Have a great one!",
    "See ya next time!",
    "Take care!",
    "See ya 'round.",
    "Later!",
    "Bye bye!",
  ]);

const getWeHaveAlts = () =>
  getRandomElement(["we have", "we're seeing", "there's"]);

const getRightNowVariations = (locationName: string) =>
  getRandomElement([
    `Right now in ${locationName}`,
    `Currently in ${locationName}`,
    `At this time in ${locationName}`,
    `In ${locationName} at the moment`,
    `In ${locationName} right now`,
    `In ${locationName} currently`,
  ]);

export {
  getGeneralGreetings,
  getSignOff,
  getWeHaveAlts,
  getRightNowVariations,
  getTimeBasedGreetings,
};

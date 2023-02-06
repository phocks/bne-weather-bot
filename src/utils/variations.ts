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

const getSignOff = () =>
  getRandomElement([
    "Have a great day!",
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
};

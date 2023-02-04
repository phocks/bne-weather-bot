# BNE Weather Bot

Hello. Welcome to the source code for [@weather@bne.social](https://bne.social/@weather). I made this bot for fun and to learn more about the [Mastodon API](https://docs.joinmastodon.org/api/) but thought it might be good to release the code to the public and see if anyone wants to help build features.

Currently the bot simply gets data from [OpenWeather](https://openweathermap.org/) and generates toots at regular intervals. I'm open to other functionality like specific weather alerts etc. and some things to break up the repetativeness, maybe like detecting what kind of weather it is and saying fun things if it's sunny or rainy like "hope you've got your raincoat" or something like that. Anyway, we'll see.

Commits (and pull requests) to `main` will be automatically deployed to [Deno Deploy](https://deno.com/deploy) and will run when the bot is triggered. Triggering is handled by [UptimeRobot](https://uptimerobot.com/).

## Local dev

Feel free to have a play around. Best way to get started is to clone the repo then you should be able to set your own API keys in the `.env` file.

Run with `deno run --allow-all main.ts`.

Hit the trigger endpoint to do a test toot (on your test Mastodon account).

## Roadmap

**If you feel like building out any of these features that would be great!**

* Greetings based on BNE time
* Exteme weather alerts
* Rain warnings etc
* (other stuff)

## Thanks

From [Josh](https://bne.social/@phocks).

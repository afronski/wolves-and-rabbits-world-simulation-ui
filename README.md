# wolves-and-rabbits-world-simulation-ui

## Description

This is an UI for a server implementation from an assignment described by Francessco Cessarini [here](http://www.youtube.com/watch?v=d5G3P2iosmA).

A textual description:

> We had to implement a simulated world inhabited by carrots, rabbits, and wolves. Rabbits would roam this world eating carrots that grew in random patches. When they had eaten enough carrots, the rabbits would get fat and split in two. Wolves ran around eating up the rabbits; if they managed to catch and eat enough rabbits, they would also get fat and split. Rabbits and wolves within a certain distance of each other would broadcast information on food and predators. If a rabbit found a carrot patch, other rabbits would quickly join him. If a wolf found a rabbit, the pack would start chasing it.

## UI

![Simulation in action](/docs/Screenshot.png)

## How to build and run it locally?

1. `mix phoenix.server`

## Deployment on Heroku

1. `heroku login`
2. `heroku create`
3. `heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git`
4. `heroku config:set HEROKU_APP_NAME=$(heroku apps:info | grep === | cut -d' ' -f2)`
5. `heroku config:add DATADOG_API_KEY=<YOUR-API-KEY>`
3. `git push heroku master`
4. `heroku ps:scale web=1`
5. `heroku open`

## Assets

## Graphics

All *sprites* were made by me.

*Favicon* is available [here](http://www.favicon.cc/?action=icon&file_id=719881).

### Music

Music is created by [Eric Skiff](http://ericskiff.com/music/) and provided also on [Creative Commons Attribution](http://creativecommons.org/licenses/by/3.0/) license.

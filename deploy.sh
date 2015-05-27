#!/bin/sh

heroku create
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
heroku config:set HEROKU_APP_NAME=$(heroku apps:info | grep === | cut -d' ' -f2)
heroku config:add DATADOG_API_KEY=$DATADOG
git push heroku master
heroku ps:scale web=1
heroku open

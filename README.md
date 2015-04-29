# wolves-and-rabbits-world-simulation-ui

## Description

This is an UI for a server implementation from an assignment described by Francessco Cessarini [here](http://www.youtube.com/watch?v=d5G3P2iosmA).

A textual description:

> We had to implement a simulated world inhabited by carrots, rabbits, and wolves. Rabbits would roam this world eating carrots that grew in random patches. When they had eaten enough carrots, the rabbits would get fat and split in two. Wolves ran around eating up the rabbits; if they managed to catch and eat enough rabbits, they would also get fat and split. Rabbits and wolves within a certain distance of each other would broadcast information on food and predators. If a rabbit found a carrot patch, other rabbits would quickly join him. If a wolf found a rabbit, the pack would start chasing it.

## How to build and run it?

1. `mix phoenix.server`

## TODO

- *TODO*: Hooking up to the `simulation_event_stream`.
- *TODO*: Adding tests to the implementation.
- *TODO*: Buttons for starting / stopping simulation.
- *TODO*: Feed with live changes on the right.
- *TODO*: Canvas visualization! :)
- *TODO*: Music during simulation! ;)
- *TODO*: React.js + Flux (?).
- *TODO*: Deploy it to the Heroku.

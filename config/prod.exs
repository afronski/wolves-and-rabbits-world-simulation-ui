use Mix.Config

config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: "example.com"]

config :logger, level: :info

import_config "prod.secret.exs"

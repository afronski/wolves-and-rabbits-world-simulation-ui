use Mix.Config

config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  http: [port: 4001],
  server: false

config :logger, level: :warn

use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "wolves_and_rabbits_world_simulation_ui_test",
  size: 1,
  max_overflow: false

use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  secret_key_base: "mFiM20tJFBo6mEKV8IykbCxuK11JzhZ5f5UlbaZHiUKHW/PfxDYodhLYOdz+IEE3"

# Configure your database
config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "wolves_and_rabbits_world_simulation_ui_prod"

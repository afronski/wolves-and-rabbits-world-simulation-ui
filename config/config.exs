use Mix.Config

config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "7G4qKMpUCIS8At1foKliMavYUyJchluJiyAvplqlnNL4i5wrizBKmmoRgei5qfc1",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: WolvesAndRabbitsWorldSimulationUi.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

import_config "#{Mix.env}.exs"

config :phoenix, :generators,
  migration: true,
  binary_id: false

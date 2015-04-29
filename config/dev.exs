use Mix.Config

config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch"]]

config :wolves_and_rabbits_world_simulation_ui, WolvesAndRabbitsWorldSimulationUi.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

config :logger, :console, format: "[$level] $message\n"

defmodule WolvesAndRabbitsWorldSimulationUi.Endpoint do
  use Phoenix.Endpoint, otp_app: :wolves_and_rabbits_world_simulation_ui

  # Serve at "/" the given assets from "priv/static" directory
  plug Plug.Static,
    at: "/", from: :wolves_and_rabbits_world_simulation_ui,
    only: ~w(css images js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_wolves_and_rabbits_world_simulation_ui_key",
    signing_salt: "tNoRkmZY",
    encryption_salt: "7KZDi+Vm"

  plug :router, WolvesAndRabbitsWorldSimulationUi.Router
end

defmodule WolvesAndRabbitsWorldSimulationUi.Endpoint do
  use Phoenix.Endpoint, otp_app: :wolves_and_rabbits_world_simulation_ui

  socket "/communications", WolvesAndRabbitsWorldSimulationUi.CommunicationsSocket

  plug Plug.Static,
    at: "/", from: :wolves_and_rabbits_world_simulation_ui, gzip: false,
    only: ~w(css images assets js favicon.ico robots.txt)

  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
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
    signing_salt: "tNoRkmZY"

  plug WolvesAndRabbitsWorldSimulationUi.Router
end

defmodule WolvesAndRabbitsWorldSimulationUi do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(WolvesAndRabbitsWorldSimulationUi.Endpoint, [])
    ]

    :simulation_event_stream.remove_handler(:simulation_cli_handler)
    :simulation_event_stream.attach_handler(:'Elixir.WolvesAndRabbitsWorldSimulationUi.EventsStream')

    opts = [strategy: :one_for_one, name: WolvesAndRabbitsWorldSimulationUi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    WolvesAndRabbitsWorldSimulationUi.Endpoint.config_change(changed, removed)
    :ok
  end
end

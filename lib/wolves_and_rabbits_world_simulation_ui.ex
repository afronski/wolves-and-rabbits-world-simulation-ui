defmodule WolvesAndRabbitsWorldSimulationUi do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(WolvesAndRabbitsWorldSimulationUi.Endpoint, [])
    ]

    opts = [strategy: :one_for_one, name: WolvesAndRabbitsWorldSimulationUi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    WolvesAndRabbitsWorldSimulationUi.Endpoint.config_change(changed, removed)
    :ok
  end
end

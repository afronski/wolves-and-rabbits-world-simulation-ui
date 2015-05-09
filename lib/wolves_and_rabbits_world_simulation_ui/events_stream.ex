defmodule WolvesAndRabbitsWorldSimulationUi.EventsStream do
  use GenEvent
  require Logger

  def handle_event(message, state) do
    WolvesAndRabbitsWorldSimulationUi.Endpoint.broadcast! "events", "incoming", %{body: message}
    {:ok, state}
  end
end

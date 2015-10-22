defmodule WolvesAndRabbitsWorldSimulationUi.CommunicationsSocket do
  use Phoenix.Socket

  channel "controller", WolvesAndRabbitsWorldSimulationUi.Communications.ControllerChannel
  channel "events", WolvesAndRabbitsWorldSimulationUi.Communications.IncomingEventsChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end

defmodule WolvesAndRabbitsWorldSimulationUi.Communications.IncomingEventsChannel do
  use Phoenix.Channel
  require Logger

  def join("events", _auth, socket) do
    {:ok, socket}
  end

  def handle_out("incoming", message, socket) do
    Logger.info "Incoming event: #{inspect message.body}"
    push socket, "incoming", build_message(message.body)

    {:noreply, socket}
  end

  defp build_message({who, action, _}), do: %{who: who, action: action}
  defp build_message({who, pid, action, _}) when is_pid(pid), do: %{who: who, action: action}
end

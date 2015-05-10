defmodule WolvesAndRabbitsWorldSimulationUi.Communications.IncomingEventsChannel do
  use Phoenix.Channel
  require Logger

  def join("events", _auth, socket) do
    {:ok, socket}
  end

  def handle_out("incoming", message, socket) do
    Logger.info "Incoming event: #{inspect message.body}"
    push socket, "incoming", build_client_message(message.body)

    {:noreply, socket}
  end

  defp id(pid) do
    string = :erlang.list_to_binary(:erlang.pid_to_list(pid))
    [ _, result | _ ] = Regex.run(~r/<0\.(\d+)\.0>/i, string)
    {value, _} = Integer.parse(result)
    value
  end

  defp build_client_message({:carrot, action, {:carrot, pid, _, {:position, x, y}, _}}), do: %{who: :carrot, id: id(pid), action: action, x: x, y: y}
  defp build_client_message({:rabbit, action, {:rabbit, pid, {:position, x, y}, _, _, _, _, _, _, _, _}}), do: %{who: :rabbit, id: id(pid), action: action, x: x, y: y}
  defp build_client_message({:wolf, action, {:wolf, pid, {:position, x, y}, _, _, _, _, _, _, _}}), do: %{who: :wolf, id: id(pid), action: action, x: x, y: y}

  defp build_client_message({who, pid, action, _}) when is_pid(pid), do: %{who: who, action: action}
  defp build_client_message({who, action, _}), do: %{who: who, action: action}
end

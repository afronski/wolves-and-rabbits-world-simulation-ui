defmodule WolvesAndRabbitsWorldSimulationUi.Communications.ControllerChannel do
  use Phoenix.Channel

  def join("controller", _auth, socket) do
    {:ok, socket}
  end

  def handle_in("start_simulation", _body, socket) do
    IO.puts "Start simulation."
    {:noreply, socket}
  end

  def handle_in("stop_simulation", _body, socket) do
    IO.puts "Stop simulation."
    {:noreply, socket}
  end
end

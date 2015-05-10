defmodule WolvesAndRabbitsWorldSimulationUi.PageController do
  use WolvesAndRabbitsWorldSimulationUi.Web, :controller

  plug :action

  def index(conn, _params) do
    { {:width, width},
      {:height, height},
      {:simulation_started, is_started} } = :simulation_controller.get_simulation_parameters()

    parameters = %{
      width: width,
      height: height,
      simulation_started: is_started,
      margin: 40
    }

    render conn, "index.html", %{world: parameters}
  end
end

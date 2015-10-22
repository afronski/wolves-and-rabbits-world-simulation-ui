defmodule WolvesAndRabbitsWorldSimulationUi.PageController do
  use WolvesAndRabbitsWorldSimulationUi.Web, :controller

  def index(conn, _params) do
    { {:width, width},
      {:height, height},
      {:simulation_started, is_started} } = :simulation_controller.get_simulation_parameters()

    parameters = %{
      width: width,
      height: height,
      simulation_started: is_started,
      tile_size: 10,
      margin: 2
    }

    render conn, "index.html", %{world: parameters}
  end
end

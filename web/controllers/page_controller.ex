defmodule WolvesAndRabbitsWorldSimulationUi.PageController do
  use WolvesAndRabbitsWorldSimulationUi.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end

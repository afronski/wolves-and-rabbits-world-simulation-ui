defmodule WolvesAndRabbitsWorldSimulationUi.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  scope "/", WolvesAndRabbitsWorldSimulationUi do
    pipe_through :browser

    get "/", PageController, :index
  end

   socket "/communications", WolvesAndRabbitsWorldSimulationUi.Communications do
     channel "controller", ControllerChannel
   end
end

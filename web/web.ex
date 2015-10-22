defmodule WolvesAndRabbitsWorldSimulationUi.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use WolvesAndRabbitsWorldSimulationUi.Web, :controller
      use WolvesAndRabbitsWorldSimulationUi.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def controller do
    quote do
      use Phoenix.Controller

      import WolvesAndRabbitsWorldSimulationUi.Router.Helpers
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      use Phoenix.HTML

      import WolvesAndRabbitsWorldSimulationUi.Router.Helpers
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end

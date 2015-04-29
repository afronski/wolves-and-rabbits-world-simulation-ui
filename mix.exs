defmodule WolvesAndRabbitsWorldSimulationUi.Mixfile do
  use Mix.Project

  def project do
    [app: :wolves_and_rabbits_world_simulation_ui,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  def application do
    [mod: {WolvesAndRabbitsWorldSimulationUi, []},
     applications: [:phoenix, :cowboy, :logger,
                    :sasl, :wolves_and_rabbits_world_simulation]]
  end

  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  defp deps do
    [{:phoenix, "~> 0.11"},
     {:phoenix_live_reload, "~> 0.3"},
     {:cowboy, "~> 1.0"},
     {:wolves_and_rabbits_world_simulation, github: "afronski/wolves-and-rabbits-world-simulation"}]
  end
end

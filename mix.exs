defmodule WolvesAndRabbitsWorldSimulationUi.Mixfile do
  use Mix.Project

  def project do
    [
      app: :wolves_and_rabbits_world_simulation_ui,
      version: "1.0.0",
      elixir: "~> 1.1",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix] ++ Mix.compilers,
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      deps: deps
    ]
  end

  def application do
    [
      mod: {WolvesAndRabbitsWorldSimulationUi, []},
      applications: [
        :logger,
        :exometer,
        :cowboy,
        :phoenix,
        :sasl,
        :wolves_and_rabbits_world_simulation
      ]
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  defp deps do
    [
      {:phoenix, "~> 1.0.3"},
      {:phoenix_html, "~> 2.1"},

      {:cowboy, "~> 1.0"},

      {:wolves_and_rabbits_world_simulation, github: "afronski/wolves-and-rabbits-world-simulation"},

      {:phoenix_live_reload, "~> 1.0", only: :dev},

      {:exometer_core, github: "PSPDFKit-labs/exometer_core", override: true},
      {:exometer, github: "PSPDFKit-labs/exometer"},

      {:edown, github: "uwiger/edown", tag: "0.7", override: true}
    ]
  end
end

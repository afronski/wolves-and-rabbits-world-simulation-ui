defmodule WolvesAndRabbitsWorldSimulationUi.PageControllerTest do
  use WolvesAndRabbitsWorldSimulationUi.ConnCase

  test "page should have main header" do
    conn = get conn(), "/"

    assert html_response(conn, 200) =~ "Wolves, Rabbits and Carrots"
  end

  test "page should have world parameters rendered" do
    conn = get conn(), "/"

    assert html_response(conn, 200) =~ "data-world-width=\"70\""
    assert html_response(conn, 200) =~ "data-world-height=\"70\""
  end
end

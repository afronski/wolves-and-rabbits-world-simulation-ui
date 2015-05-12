defmodule WolvesAndRabbitsWorldSimulationUi.PageControllerTest do
  use WolvesAndRabbitsWorldSimulationUi.ConnCase

  test "page should have main header" do
    conn = get conn(), "/"

    assert conn.resp_body =~ "Wolves, Rabbits and Carrots"
  end

  test "page should have world parameters rendered" do
    conn = get conn(), "/"

    assert conn.resp_body =~ "data-world-width=\"70\""
    assert conn.resp_body =~ "data-world-height=\"70\""
  end
end

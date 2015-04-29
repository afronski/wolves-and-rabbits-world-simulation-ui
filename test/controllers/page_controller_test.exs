defmodule WolvesAndRabbitsWorldSimulationUi.PageControllerTest do
  use WolvesAndRabbitsWorldSimulationUi.ConnCase

  test "GET /" do
    conn = get conn(), "/"
    assert conn.resp_body =~ "Wolves, Rabbits and Carrots"
  end
end

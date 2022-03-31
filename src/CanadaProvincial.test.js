import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import CanadaProvincial from "./pages/CanadaProvincial";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <CanadaProvincial />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
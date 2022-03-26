import React from "react";
import ReactDOM from "react-dom";
import CanadaProvincial from "./pages/CanadaProvincial";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CanadaProvincial />, div);
  ReactDOM.unmountComponentAtNode(div);
});

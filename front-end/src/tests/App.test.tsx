import React from "react";
import App from "../App";
import ReactDOM from "react-dom";

describe("what is the unit under test?", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

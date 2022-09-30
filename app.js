import React, { useEffect, useState } from "react";

import { render } from "react-dom";
import Map from "./src/components/Map.js";

const App = () => {
  useEffect(() => {
    document.oncontextmenu = function (e) {
      // blocl right-click context menu
      e = e || window.event;
      return false;
    };
  }, []);

  return <Map />;
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

import React, { useEffect, useState } from "react";
import resso from 'resso';

import { render } from "react-dom";
import Map from "./src/components/0_map/Map.js";


resso.config({ batch: ReactDOM.unstable_batchedUpdates });

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

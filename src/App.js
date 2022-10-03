import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";

import CityMap from "./components/0_map/CityMap.js";
import IntroPage from "./components/1_intro_page/IntroPgae.js";

const App = () => {
  const { page } = stateStore;

//   useEffect(() => {
//     document.oncontextmenu = function (e) {
//       // block right-click context menu
//       e = e || window.event;
//       return false;
//     };
//   }, []);

  const content = {
    1: <IntroPage />,
    2: <IntroPage />,
    3: <CityMap />,
  };

  return content[page];
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";

import CityMap from "./components/0_map/CityMap.js";
import CoverPage from "./components/1_cover_page/CoverPage.js";
import VotingIntroPgae from "./components/2_voting_intro_page/VotingIntroPgae";


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
    1: <CoverPage />,
    2: <VotingIntroPgae />,
    3: <CityMap />,
  };

  return content[page];
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";
import 'mapbox-gl/dist/mapbox-gl.css';

import CityMap from "./components/0.0_map/CityMap";
import Sandbox from "./components/0.0_map/Sandbox";

import CoverPage from "./components/1.0_cover_page/CoverPage";
import CurrentPracticePage from "./components/1.1_current_practice/CurrentPracticePage";
import StructurePage from "./components/1.2_structure/StructurePage";
import StakeholderPage from "./components/1.3_stakeholder/StakeholderPage";
import VotingPage from "./components/1.4_voting/VotingPage";

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
    2: <CurrentPracticePage />,
    3: <StructurePage />,
    4: <StakeholderPage />,
    5: <VotingPage />,
    // 3: <IncentivePolicyIntroPage />,
    6: <Sandbox />,
    7: <CityMap />,
  };

  return content[page];
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

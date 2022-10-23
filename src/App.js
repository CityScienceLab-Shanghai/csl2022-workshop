import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";
import 'mapbox-gl/dist/mapbox-gl.css';

import CityMap from "./components/0.0_map/CityMap";
import Sandbox from "./components/0.0_map/Sandbox";
import CoverPage from "./components/1.0_cover_page/CoverPage";
import CurrentPracticePage from "./components/1.1_current_practice/CurrentPracticePage";
import VotingIntroPgae from "./components/2_voting_intro_page/VotingIntroPgae";
import IncentivePolicyIntroPage from "./components/3.1_incentive_policy_intro_page/IncentivePolicyIntroPage";
import IncentivePolicyProposalPage from "./components/3.2_incentive_policy_proposal_page/IncentivePolicyProposalPage";

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
    3: <IncentivePolicyIntroPage />,
    4: <Sandbox />,
    5: <CityMap />,
  };

  return content[page];
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";

import CityMap from "./components/0_map/CityMap";
import CoverPage from "./components/1_cover_page/CoverPage";
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
    2: <VotingIntroPgae />,
    3: <IncentivePolicyIntroPage />,
    4: <IncentivePolicyProposalPage />,
    5: <CityMap />,
  };

  return content[page];
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

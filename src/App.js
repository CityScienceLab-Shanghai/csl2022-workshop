import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";
import "mapbox-gl/dist/mapbox-gl.css";

import CityMap from "./components/0.0_map/CityMap";
import Sandbox from "./components/0.0_map/Sandbox";
import GroupSandbox from "./components/0.0_map/GroupSandbox";
import Navigation from "./components/0.2_navigation/Navigation";
import ResPage from "./components/0.3_resolution/ResPage";

import CoverPage from "./components/1.0_cover_page/CoverPage";
import CurrentPracticePage from "./components/1.1_current_practice/CurrentPracticePage";
import StructurePage from "./components/1.2_structure/StructurePage";
import StakeholderPage from "./components/1.3_stakeholder/StakeholderPage";
import VotingPage from "./components/1.4_voting/VotingPage";

import IncentiveIntroPage from "./components/2.1_intro_page/IncentiveIntroPage";
import IncentiveVotingPage from "./components/2.2_voting/IncentiveVotingPage";
import IncentiveResultPage from "./components/2.3_results/IncentiveResultPage";
import IncentivePerformancePage from "./components/2.4_performance/IncentivePerformancePage";


import EndowmentIntroPage from "./components/4.1_intro_page/EndowmentIntroPage";
import EndowmentVotingPage from "./components/4.2_voting/EndowmentVotingPage";
import EndowmentResultPage from "./components/4.3_results/EndowmentResultPage";
import EndowmentPerformancePage from "./components/4.4_performance/EndowmentPerformancePage";

import TransitionPage from "./components/5.0_transition_page/TransitionPage";

const App = () => {
  const { page } = stateStore;

  // disable right click
  //   useEffect(() => {
  //     document.oncontextmenu = function (e) {
  //       // block right-click context menu
  //       e = e || window.event;
  //       return false;
  //     };
  //   }, []);

  // responsive design
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowSize.width < 1280) setIsMobile(true);
    else setIsMobile("ontouchstart" in document.documentElement);
  }, [windowSize.width, windowSize.height]);

  const content = {
    1: <GroupSandbox />,
    // 1: <CoverPage />,
    2: <CurrentPracticePage />,
    3: <StructurePage />,
    4: <StakeholderPage />,
    5: <VotingPage />,
    6: <IncentiveIntroPage />,
    7: <IncentiveVotingPage />,
    8: <IncentiveResultPage />,
    9: <IncentivePerformancePage />,
    10: <EndowmentIntroPage />,
    11: <EndowmentVotingPage />,
    12: <EndowmentResultPage />,
    13: <EndowmentPerformancePage />,
    14: <TransitionPage />,
    15: <GroupSandbox />,
    16: <Sandbox />,
    17: <CityMap />,
  };

  return isMobile ? (
    <ResPage />
  ) : (
    <>
      <Navigation />
      {content[page]}
    </>
  );
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}

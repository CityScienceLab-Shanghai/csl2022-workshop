import React, { useState, useEffect } from "react";

// import CityMap from "./CityMap";
import KendallMap from "./KendallMap";

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard";
import PanelCard from "./PanelCard";
import VotingCard from "./VotingCard";
import IndicatorCard from "./IndicatorCard";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import CusSliders from "../0.5_slider/CusSliders";
import _BAR_DATA from "../../data/charts/bar_chart.json";
// import _RADAR_DATA from "../../data/charts/radar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart _simple.json";
import _BUILDINGS from "../../data/sandbox/explorable_building.json";
import _AMENITIES_DATA from "../../data/sandbox/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";
import SELETED_AMEN_IND_LIST from "../../data/sandbox/selected_amen_ind_list.json";

import CustomButton from "../0.1_buttons/CustomButton";

import _CONTENT from "../../data/sandbox/sandbox_card_content.json";

const GroupSandbox = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [buildingID, setBuildingID] = useState(0);
  const [votePolicy, setVotePolicy] = useState(true);

  //   const [sliderIndex, setSliderIndex] = useState(0);

  console.log("render");

//   const [radarCharts, setRadarCharts] = useState(_RADAR_DATA);

  let button_set_1 = [];
  let button_set_2 = [];


//   const [selected, setSelected] = useState(selected_status);
//   const [countSelected, setCountSelected] = useState(0);

//   useEffect(() => {
//     let proposal = barCharts["ks"][0]["value"];

//     Object.keys(selected).forEach(function (key) {
//       // if (selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"])
//       if (selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"]) + 1;
//     });
//     updateBarCharts("ks", 0, proposal);
//   }, [selected]);

  if (_AMENITIES_DATA) {
    for (var i = 0; i < 12; i++)
      if (SELETED_AMEN_IND_LIST.includes(i)) {
        button_set_1.push(
          <div className={styles.rowGroup}>
            <CustomButton
              key={_AMENITIES_DATA[i]["id"]}
              index={_AMENITIES_DATA[i]["id"]}
              buttonText={_AMENITIES_DATA[i].name}
              positionStyle={styles.amen_button}
              buttonOnclick={() => {}}
              colorIndex={parseInt(_AMENITIES_DATA[i].id) + 1}
              largeFont={false}
              selectedColor={_COLOR[parseInt(_AMENITIES_DATA[i].id) + 1]}
            //   selected={selected}
            //   setSelected={setSelected}
            //   countSelected={countSelected}
            //   setCountSelected={setCountSelected}
              isVoted={isVoted}
              capacity={3}
            />
            <div className={styles.costText}>
              {"Cost $" +
                _AMENITIES_DATA[i]["cost"] +
                "\nROI " +
                _AMENITIES_DATA[i]["ROI"]}{" "}
            </div>
          </div>
        );
      }
    for (var i = 12; i < 24; i++)
      if (SELETED_AMEN_IND_LIST.includes(i)) {
        button_set_2.push(
          <div className={styles.rowGroup}>
            <CustomButton
              key={_AMENITIES_DATA[i]["id"]}
              index={_AMENITIES_DATA[i]["id"]}
              buttonText={_AMENITIES_DATA[i].name}
              positionStyle={styles.amen_button}
              buttonOnclick={() => {}}
              colorIndex={parseInt(_AMENITIES_DATA[i].id) + 1}
              largeFont={false}
              selectedColor={_COLOR[parseInt(_AMENITIES_DATA[i].id) + 1]}
            //   selected={selected}
            //   setSelected={setSelected}
            //   countSelected={countSelected}
            //   setCountSelected={setCountSelected}
              isVoted={isVoted}
              capacity={3}
            />
            <div className={styles.costText}>
              {"Cost $" +
                _AMENITIES_DATA[i]["cost"] +
                "  ROI " +
                _AMENITIES_DATA[i]["ROI"]}{" "}
            </div>{" "}
          </div>
        );
      }
  }

  const PolicyVoteCard = () => {
    return (
      <VotingCard
        title="Incentive for Developers"
        subTitle="Voting Panel"
        content={<CusSliders />}
      />
    );
  };

  const EndowmentVoteCard = () => {
    let content = (
      <div>
        <div className={styles.amen_list}>
          {button_set_1}
          {button_set_2}
        </div>
      </div>
    );
    return (
      <VotingCard
        title="Endowment Usage"
        subTitle="Voting Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  return (
    <div>
      <KendallMap
        className={styles.visualization}
        isBuilding={isBuilding}
        isVoting={isVoting}
        buildingID={buildingID}
      />
      <div
        className={`${styles.containerFluid} ${styles.h100} ${styles.w100} ${styles.flexRow}`}
      >
        <div className={`${styles.panelCol} ${styles.col3} ${styles.flexCol}`}>
          <TitleCard />
          <PolicyVoteCard />
          <EndowmentVoteCard />
        </div>
        <div className={`${styles.col}`}></div>
        <div className={`${styles.outputCol} ${styles.col3} ${styles.flexCol}`}>
          <IndicatorCard
            title="Indicators"
            subTitle="Community Endowment"
            content={
              <div className={styles.bar}>
                <BarChart dataKey="ks" horizontal="true" />
              </div>
            }
          />
          <IndicatorCard
            title="Indicators"
            subTitle="Urban Performance"
            content={
              <div className={styles.radar}>
                <RadarChart dataKey="ks" />
              </div>
            }
          />
        </div>
      </div>

      <img className={styles.logo} src={`/lablogo.png`} alt={""} />
    </div>
  );
};

export default GroupSandbox;

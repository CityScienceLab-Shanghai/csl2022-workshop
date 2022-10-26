import React, { useState, useEffect } from "react";
import CityMap from "./CityMap";

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard";
import PanelCard from "./PanelCard";
import VotingCard from "./VotingCard";
import IndicatorCard from "./IndicatorCard";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import _BAR_DATA from "../../data/charts/bar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart.json";
import _BUILDINGS from "../../data/explorable_building.json";
import _AMENITIES_DATA from "../../data/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";

import CustomButton from "../0.1_buttons/CustomButton";

import _CONTENT from "../../data/sandbox_card_content.json";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { stateStore } from "../../stores";

const GroupSandbox = () => {
  const { radarCharts, barCharts, updateBarCharts } = stateStore;

  const [isBuilding, setIsBuilding] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [buildingID, setBuildingID] = useState(0);
  const [votePolicy, setVotePolicy] = useState(true);

  const [sliderIndex, setSliderIndex] = useState(0);

  let button_set_1 = [];
  let button_set_2 = [];
  let selected_status = {};
  for (var i = 0; i < 24; i++) selected_status[_AMENITIES_DATA[i].id] = false;

  const [selected, setSelected] = useState(selected_status);
  const [selectedResult, setSelectedResult] = useState(selected_status);
  const [countSelected, setCountSelected] = useState(0);

  if (_AMENITIES_DATA) {
    for (var i = 0; i < 12; i++) {
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
            selected={selected}
            setSelected={setSelected}
            countSelected={countSelected}
            setCountSelected={setCountSelected}
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
    for (var i = 12; i < 24; i++) {
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
            selected={selected}
            setSelected={setSelected}
            countSelected={countSelected}
            setCountSelected={setCountSelected}
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

  useEffect(() => {
    let baseline = barCharts["ks"][1]["value"];
    let proposal = baseline;

    Object.keys(selected).forEach(function (key) {
      if (selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"]);
    });

    updateBarCharts("ks", 0, proposal);
    // console.log(proposal);
    // console.log(barCharts["ks"][0]["value"]);
  }, [selected]);

  const PolicyVoteCard = () => {
    let content = (
      <div className={styles.buttonGroup}>
        <div className={styles.slider}>
          <Slider
            min={0}
            max={10}
            onChange={(value) => {
              setSliderIndex(value);
            }}
          />
        </div>
      </div>
    );

    return (
      <VotingCard
        title="Incentive for Developers"
        subTitle="Voting Panel"
        content={content}
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
      <CityMap
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
                <BarChart data={barCharts["ks"]} horizontal="true" />
              </div>
            }
          />
          <IndicatorCard
            title="Indicators"
            subTitle="Urban Performance"
            content={
              <div className={styles.radar}>
                <RadarChart
                  data={
                    isBuilding ? radarCharts[buildingID] : radarCharts["ks"]
                  }
                />
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

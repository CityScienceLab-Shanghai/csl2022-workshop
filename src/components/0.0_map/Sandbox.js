import React, { useState, useEffect } from "react";
import CityMap from "./CityMap";

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard";
import PanelCard from "./PanelCard";
import IndicatorCard from "./IndicatorCard";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import _BAR_DATA from "../../data/charts/bar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart.json";
import _BUILDINGS from "../../data/sandbox/explorable_building.json";
import _AMENITIES_DATA from "../../data/sandbox/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";

import CustomButton from "../0.1_buttons/CustomButton";

import _CONTENT from "../../data/sandbox/sandbox_card_content.json";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { stateStore } from "../../stores";

const Sandbox = () => {
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
              "  ROI " +
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
    console.log(barCharts);
  }, [selected]);

  const KendallInfoCard = () => (
    <PanelCard
      title="Site Information"
      subTitle="Kendall Square"
      content={_CONTENT["kendall"]}
    />
  );

  const BuildingButtonCard = () => {
    let buttonGroup = [];
    const buildingList = Object.values(_BUILDINGS);
    for (var i = 0; i < 2; i++) {
      buttonGroup.push(
        <CustomButton
          key={buildingList[i].id}
          buttonText={buildingList[i].name}
          positionStyle={styles.inbox_button}
          buttonOnclick={() => {}}
          colorIndex={25}
          largeFont={false}
          building={buildingList[i].id}
          setIsBuilding={setIsBuilding}
          setBuildingID={setBuildingID}
          setIsVoting={setIsVoting}
        />
      );
    }
    return (
      <PanelCard
        title="Explore"
        subTitle="All Explorable Buildings"
        content={<div className={styles.buttonGroup}>{buttonGroup}</div>}
      />
    );
  };

  const BuildingInfoCard = () => (
    <PanelCard
      title="Building Information"
      subTitle={_BUILDINGS[buildingID].name}
      content={_BUILDINGS[buildingID].content}
    />
  );

  const BuildingVoteCard = () => {
    let buttonGroup = [];
    buttonGroup.push(
      <CustomButton
        key="1"
        buttonText="Vote for Incentive Policy"
        positionStyle={styles.inbox_button}
        buttonOnclick={() => {
          setIsVoting(true);
          setVotePolicy(true);
        }}
        colorIndex={25}
        largeFont={false}
      />
    );
    buttonGroup.push(
      <CustomButton
        key="2"
        buttonText="Vote for Endowment Usage"
        positionStyle={styles.inbox_button}
        buttonOnclick={() => {
          setIsVoting(true);
          setVotePolicy(false);
        }}
        colorIndex={25}
        largeFont={false}
      />
    );
    return (
      <PanelCard
        title="Explore"
        subTitle="All Explorable Buildings"
        content={<div className={styles.buttonGroup}>{buttonGroup}</div>}
      />
    );
  };

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
        {isVoted ? (
          <CustomButton
            buttonText="Voted"
            positionStyle={styles.inbox_button}
            buttonOnclick={() => {}}
            colorIndex={26}
            largeFont={false}
          />
        ) : (
          <CustomButton
            buttonText="Submit"
            positionStyle={styles.inbox_button}
            buttonOnclick={() => {
              setIsVoted(true);
            }}
            colorIndex={25}
            largeFont={false}
          />
        )}
      </div>
    );

    return (
      <PanelCard
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
        {isVoted ? (
          <CustomButton
            buttonText="Voted"
            positionStyle={styles.inbox_button}
            buttonOnclick={() => {}}
            colorIndex={26}
            largeFont={false}
          />
        ) : (
          <CustomButton
            buttonText="Submit"
            positionStyle={styles.inbox_button}
            buttonOnclick={() => {
              setIsVoted(true);
            }}
            colorIndex={25}
            largeFont={false}
          />
        )}
      </div>
    );
    return (
      <PanelCard
        title="Endowment Usage"
        subTitle="Voting Panel"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const PolicyResultCard = () => {
    let content = <div></div>;
    return (
      <PanelCard
        title="Incentive for Developers"
        subTitle="Voting Result"
        content={<div className={styles.buttonGroup}>{content}</div>}
      />
    );
  };

  const EndowmentResultCard = () => {
    let content = <div></div>;
    return (
      <PanelCard
        title="Endowment Usage"
        subTitle="Voting Result"
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
          {!isBuilding ? <KendallInfoCard /> : ""}
          {!isBuilding ? <BuildingButtonCard /> : ""}
          {isBuilding && !isVoting ? <BuildingInfoCard /> : ""}
          {isBuilding && !isVoting ? <BuildingVoteCard /> : ""}
          {isVoting && votePolicy ? <PolicyVoteCard /> : ""}
          {isVoting && !votePolicy ? <EndowmentVoteCard /> : ""}
          {isVoted && votePolicy ? <PolicyResultCard /> : ""}
          {isVoted && !votePolicy ? <EndowmentResultCard /> : ""}
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
          {isBuilding ? (
            <div className={styles.button}>
              <CustomButton
                buttonText="Save and Leave"
                positionStyle={styles.button}
                buttonOnclick={() => {
                  setIsBuilding(false);
                  setIsVoting(false);
                  setIsVoted(false);
                  setSelected(selected_status);
                  setCountSelected(0);
                }}
                colorIndex={25}
                largeFont={true}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <img className={styles.logo} src={`/lablogo.png`} alt={""} />
    </div>
  );
};

export default Sandbox;

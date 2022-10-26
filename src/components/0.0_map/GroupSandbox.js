import React, { useState, useEffect } from "react";

// import CityMap from "./CityMap";
import KendallMap from "./KendallMap"

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard";
import PanelCard from "./PanelCard";
import VotingCard from "./VotingCard";
import IndicatorCard from "./IndicatorCard";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import _BAR_DATA from "../../data/charts/bar_chart.json";
// import _RADAR_DATA from "../../data/charts/radar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart _simple.json";
import _BUILDINGS from "../../data/sandbox/explorable_building.json";
import _AMENITIES_DATA from "../../data/sandbox/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";
import SELETED_AMEN_IND_LIST from "../../data/sandbox/selected_amen_ind_list.json";

import CustomButton from "../0.1_buttons/CustomButton";

import _CONTENT from "../../data/sandbox/sandbox_card_content.json";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import { stateStore } from "../../stores";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#EA4C6F",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#2f0f16 ",
    border: "1px solid #ea4c6f ",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(234, 76, 111, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-valueLabel": {
    marginTop: "3px",
    background: "#cecece",
    borderRadius: "2px",

    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "10px",

    color: "rgba(0, 0, 0, 0.75)",

    paddingTop: "3px",
    paddingRight: "6px",
    paddingBottom: "2px",
    paddingLeft: "6px",
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: "#2D2D2D",
    opacity: 1,
    height: 3,
  },
}));

const GroupSandbox = () => {
  const { barCharts, updateBarCharts } = stateStore;

  const [isBuilding, setIsBuilding] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [buildingID, setBuildingID] = useState(0);
  const [votePolicy, setVotePolicy] = useState(true);

  //   const [sliderIndex, setSliderIndex] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const [radarCharts, setRadarCharts] = useState(_RADAR_DATA);

  let button_set_1 = [];
  let button_set_2 = [];
  let selected_status = {};
  for (var i = 0; i < 24; i++) selected_status[_AMENITIES_DATA[i].id] = false;

  const [selected, setSelected] = useState(selected_status);
  const [selectedResult, setSelectedResult] = useState(selected_status);
  const [countSelected, setCountSelected] = useState(0);

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

  const Sliders = () => {
    const {
      simple_sandbox_slider_value_1,
      simple_sandbox_slider_value_2,
      set_simple_sandbox_slider_value_1,
      set_simple_sandbox_slider_value_2,
    } = stateStore;

    const valueLabelFormat = (value) => {
      //   console.log(value.toString()+ ((value <= 1) ? "storey" : "stories"));
      return value.toString() + (value <= 1 ? " storey" : " stories");
    };

    return (
      <div>
        <div className={styles.sliderBox}>
          <div className={styles.sliderItemText}>Building A</div>
          <div className={styles.sliderItem}>
            <CustomSlider
              min={0}
              max={10}
              value={simple_sandbox_slider_value_1}
              onChange={(event, newValue) => {
                set_simple_sandbox_slider_value_1(newValue);
              }}
              step={1}
              marks
              valueLabelDisplay="on"
              valueLabelFormat={valueLabelFormat}
            />
          </div>
          <div className={styles.sliderItemText}>Building B</div>
          <div className={styles.sliderItem}>
            <CustomSlider
              min={0}
              max={10}
              value={simple_sandbox_slider_value_2}
              onChange={(event, newValue) => {
                set_simple_sandbox_slider_value_2(newValue);
              }}
              step={1}
              marks
              valueLabelDisplay="on"
              valueLabelFormat={valueLabelFormat}
            />
          </div>
        </div>
      </div>
    );
  };

  const PolicyVoteCard = () => {
    return (
      <VotingCard
        title="Incentive for Developers"
        subTitle="Voting Panel"
        content={<Sliders />}
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
                <BarChart data={barCharts["ks"]} horizontal="true" />
              </div>
            }
          />
          <IndicatorCard
            title="Indicators"
            subTitle="Urban Performance"
            content={
              <div className={styles.radar}>
                <RadarChart data={radarCharts} />
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

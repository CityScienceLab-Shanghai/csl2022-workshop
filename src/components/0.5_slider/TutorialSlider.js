import React, { useEffect, useRef, useState } from "react";

import styles from "./TutorialSlider.module.css";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import { stateStore } from "../../stores";

import _AMENITIES_DATA from "../../data/sandbox/amenities.json";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#EA4C6F",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "transparent",
    // border: "1px solid #ea4c6f ",
    border: "4px solid #FFFFFF",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
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
    marginBottom: "-12px",
    marginTop: "3px",
    background: "#cecece",
    borderRadius: "2px",

    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",

    color: "rgba(0, 0, 0, 0.75)",

    paddingTop: "8px",
    paddingRight: "8px",
    paddingBottom: "8px",
    paddingLeft: "8px",

    position: "relative"
  },
  "& .MuiSlider-track": {
    // height: 0,
    display: "none",
  },
  "& .MuiSlider-rail": {
    // color: "#2D2D2D",
    opacity: 1,
    height: 12,
    background: "linear-gradient(270deg, #EA4C6F 0%, #1C3EBF 100%)",
    mixBlendMode: "lighten",
    borderRadius: "8px",
  },
}));

const TutorialSlider = ({ dataKey = "ks" }) => {
  const { tutorial_sandbox_slider_value, set_tutorial_sandbox_slider_value } =
    stateStore;

  const valueLabelFormat = (value) => {
    //   console.log(value.toString()+ ((value <= 1) ? "storey" : "stories"));
    return value.toString() + (value <= 1 ? " floor" : " floors");
  };

  return (
    <div>
      <div className={styles.sliderBox}>
        <div className={styles.sliderItem}>
          <CustomSlider
            min={0}
            max={10}
            value={tutorial_sandbox_slider_value}
            onChange={(event, newValue) => {
              set_tutorial_sandbox_slider_value(newValue);
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

export default TutorialSlider;

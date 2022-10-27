import React, { useEffect, useRef, useState } from "react";

import styles from "./CusSliders.module.css";

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

const CusSliders = ({ dataKey = "ks" }) => {
  const {
    simple_sandbox_slider_value_1,
    simple_sandbox_slider_value_2,
    set_simple_sandbox_slider_value_1,
    set_simple_sandbox_slider_value_2,
    checkValid,
    setWarning,
    _PRICE_FLOOR,
  } = stateStore;

  const valueLabelFormat = (value) => {
    //   console.log(value.toString()+ ((value <= 1) ? "storey" : "stories"));
    return value.toString() + (value <= 1 ? " floor" : " floors");
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
              if (
                newValue < simple_sandbox_slider_value_1 &&
                !checkValid("ks", _PRICE_FLOOR)
              )
                setWarning(true);
              else set_simple_sandbox_slider_value_1(newValue);
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
              if (
                newValue < simple_sandbox_slider_value_2 &&
                !checkValid("ks", _PRICE_FLOOR)
              )
                setWarning(true);
              else set_simple_sandbox_slider_value_2(newValue);
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

export default CusSliders;

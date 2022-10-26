import React, { useState, useEffect } from "react";
import styles from "./CustomButton.module.css";

const COLOR_STYLE = {
  0: styles.button_0,
  1: styles.button_1,
  2: styles.button_2,
  3: styles.button_3,
  4: styles.button_4,
  5: styles.button_5,
  6: styles.button_6,
  7: styles.button_7,
  8: styles.button_8,
  9: styles.button_9,
  10: styles.button_10,
  11: styles.button_11,
  12: styles.button_12,
  13: styles.button_13,
  14: styles.button_14,
  15: styles.button_15,
  16: styles.button_16,
  17: styles.button_17,
  18: styles.button_18,
  19: styles.button_19,
  20: styles.button_20,
  21: styles.button_21,
  22: styles.button_22,
  23: styles.button_23,
  24: styles.button_24,
  25: styles.button_25,
  26: styles.button_26,
};

const CustomButton = ({
  index,
  buttonText,
  buttonOnclick,
  positionStyle,
  selected = undefined,
  setSelected = undefined,
  countSelected = undefined,
  setCountSelected = undefined,
  colorIndex = 0,
  largeFont = true,
  selectedColor = "white",
  building = undefined,
  setIsBuilding = undefined,
  setBuildingID = undefined,
  setIsVoting = undefined,
  isVoted = undefined,
  capacity = 3,
}) => {
  useEffect(() => {}, []);
  let isSelected = selected && selected[index];
  let toggle =
    selected &&
    (() => {
      if (isVoted) return;

      if (selected[index]) {
        setCountSelected(countSelected - 1);
        setSelected({
          ...selected,
          [index]: !selected[index],
        });
      }
      if (!selected[index] && countSelected < capacity) {
        setCountSelected(countSelected + 1);
        setSelected({
          ...selected,
          [index]: !selected[index],
        });
      }
    });

  let enterBuilding =
    building &&
    (() => {
      setIsBuilding(true);
      setBuildingID(building);
    });

  buttonOnclick = selected ? toggle : buttonOnclick;
  buttonOnclick = building ? enterBuilding : buttonOnclick;

  return (
    <button
      className={`${styles.button} ${COLOR_STYLE[colorIndex]} ${positionStyle}`}
      onClick={buttonOnclick}
      style={isSelected ? { color: "white", background: selectedColor } : {}}
    >
      <div className={largeFont ? styles.largetext : styles.smalltext}>
        {buttonText}
      </div>
    </button>
  );
};

export default CustomButton;

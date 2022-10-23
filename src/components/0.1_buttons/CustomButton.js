import React, { useState, useEffect } from "react";
import styles from "./CustomButton.module.css";

const COLOR_STYLE = {
  0: styles.button_0,
};

const CustomButton = ({
  buttonText,
  buttonOnclick,
  positionStyle,
  colorIndex = 0,
  largeFont = true,
}) => {
  useEffect(() => {}, []);

  return (
    <button
      className={`${styles.button} ${COLOR_STYLE[colorIndex]} ${positionStyle}`}
      onClick={buttonOnclick}
    >
      <div className={largeFont ? styles.largetext : styles.smalltext}>
        {buttonText}
      </div>
    </button>
  );
};

export default CustomButton;

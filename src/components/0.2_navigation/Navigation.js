import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

import { stateStore } from "../../stores";
import _NAVIGATION_DATA from "../../data/navigation_text.json";

// Hide navigation on some pages
const HIDE_PAGES_INDEX = [1];

const LargeCircle = ({ isActive, isSelected }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="5.5"
      cy="5.5"
      r="5"
      //   fill={isActive ? "white" : "#5B5B5B"}
      fill={isSelected ? "white" : "#121212"}
      stroke={isActive ? "white" : "#5B5B5B"}
    />
  </svg>
);

const SmallCircle = ({ isActive, isSelected }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="4"
      cy="4"
      r="3.5"
      fill={isSelected ? "white" : "#121212"}
      stroke={isActive ? "white" : "#5B5B5B"}
    />
  </svg>
);

const DecoLine_1 = () => (
  <svg
    width="1"
    height="176"
    viewBox="0 0 0.5 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.decoLine_1}
  >
    <line
      x1="0.25"
      y1="1.09278e-08"
      x2="0.249993"
      y2="176"
      stroke="#5B5B5B"
      strokeWidth="2"
    />
  </svg>
);

const DecoLine_2 = () => (
  <svg
    width="1"
    height="176"
    viewBox="0 0 0.5 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.decoLine_2}
  >
    <line
      x1="0.25"
      y1="1.09278e-08"
      x2="0.249993"
      y2="176"
      stroke="#5B5B5B"
      strokeWidth="2"
    />
  </svg>
);

const DecoLine_3 = () => (
  <svg
    width="1"
    height="176"
    viewBox="0 0 0.5 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.decoLine_3}
  >
    <line
      x1="0.25"
      y1="1.09278e-08"
      x2="0.249993"
      y2="176"
      stroke="#5B5B5B"
      strokeWidth="2"
    />
  </svg>
);

const NavItem = ({ index, text, firstLevel = true }) => {
  const { page, maxPage, setPage } = stateStore;
  let isActive = maxPage >= index || page >= index;
  let isSelected = firstLevel
    ? Math.floor((page - 2) / 4) == Math.floor((index - 2) / 4)
    : page == index;

  return isActive ? (
    <div className={styles.rowGroup}>
      <div
        className={firstLevel ? styles.title_active : styles.subtitle_active}
        onClick={() => setPage(index)}
      >
        {text}
      </div>
      <div className={styles.circle_active} onClick={() => setPage(index)}>
        {firstLevel ? (
          <LargeCircle isActive={isActive} isSelected={isSelected} />
        ) : (
          <SmallCircle isActive={isActive} isSelected={isSelected} />
        )}
      </div>
    </div>
  ) : (
    <div className={styles.rowGroup}>
      <div className={firstLevel ? styles.title : styles.subtitle}>{text}</div>
      <div className={styles.circle}>
        {firstLevel ? (
          <LargeCircle isActive={isActive} isSelected={isSelected} />
        ) : (
          <SmallCircle isActive={isActive} isSelected={isSelected} />
        )}
      </div>
    </div>
  );
};

let chapter_1 = [];
let chapter_2 = [];
let chapter_3 = [];
let sandbox = [];

for (var i = 0; i < 5; i++) {
  chapter_1.push(
    <NavItem
      key={i}
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

for (var i = 5; i < 10; i++) {
  chapter_2.push(
    <NavItem
      key={i}
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

for (var i = 10; i < 15; i++) {
  chapter_3.push(
    <NavItem
      key={i}
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

sandbox.push(
  <NavItem
    key={15}
    index={_NAVIGATION_DATA[15].page}
    text={_NAVIGATION_DATA[15].text}
    firstLevel={_NAVIGATION_DATA[15].titleLevel == 1}
  />
);

const Navigation = () => {
  const { page, maxPage } = stateStore;

  // Hide navigation on some pages
  if (HIDE_PAGES_INDEX.includes(page)) return <></>;
  else
    return (
      <div className={styles.scrollCol}>
        <div className={styles.container}>
          <DecoLine_1 />
          <DecoLine_2 />
          <DecoLine_3 />

          <div className={styles.chapter}>{chapter_1}</div>
          <div className={styles.chapter}>{chapter_2}</div>
          <div className={styles.chapter}>{chapter_3}</div>
          <div className={styles.sandbox}>{sandbox}</div>
          {/* <div className={styles.title_active}>{maxPage}</div> */}
        </div>
      </div>
    );
};

export default Navigation;

import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

import { stateStore } from "../../stores";
import _NAVIGATION_DATA from "../../data/navigation_text.json";

// Hide navigation on some pages
const HIDE_PAGES_INDEX = [1];

const LargeCircle = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5.5" cy="5.5" r="5.5" fill="white" />
  </svg>
);

const SmallCircle = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="3.5" fill="#121212" stroke="white" />
  </svg>
);

const NavItem = ({ index, text, firstLevel = true }) => {
  const { page, maxPage } = stateStore;
  //   let isActive = maxPage > index;
  return (
    <div className={styles.rowGroup}>
      <div className={styles.title_active}>{text}</div>
      <div className={styles.circle_active}>
        {firstLevel ? <LargeCircle /> : <SmallCircle />}
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
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

for (var i = 5; i < 10; i++) {
  chapter_2.push(
    <NavItem
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

for (var i = 10; i < 15; i++) {
  chapter_3.push(
    <NavItem
      index={_NAVIGATION_DATA[i].page}
      text={_NAVIGATION_DATA[i].text}
      firstLevel={_NAVIGATION_DATA[i].titleLevel == 1}
    />
  );
}

sandbox.push(
  <NavItem
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
      <div className={styles.container}>
        <div className={styles.chapter}>{chapter_1}</div>
        <div className={styles.chapter}>{chapter_2}</div>
        <div className={styles.chapter}>{chapter_3}</div>
        <div className={styles.sandbox}>{sandbox}</div>
        {/* <div className={styles.title_active}>{maxPage}</div> */}
      </div>
    );
};

export default Navigation;

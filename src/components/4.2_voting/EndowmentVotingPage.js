import React, { useState, useEffect } from "react";
import styles from "./EndowmentVotingPage.module.css";

import ToggleButton from "../0.1_buttons/ToggleButton";
import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import _AMENITIES_DATA from "../../data/sandbox/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";
import SELETED_AMEN_IND_LIST from "../../data/sandbox/selected_amen_ind_list.json";

import { stateStore } from "../../stores";

const EndowmentVotingPage = () => {
  const { page, nextPage } = stateStore;

  let button_set_1 = [];
  let button_set_2 = [];
  let selected_status = {};
  for (var i = 0; i < _AMENITIES_DATA.length; i++) selected_status[_AMENITIES_DATA[i].id] = false;

  const [selected, setSelected] = useState(selected_status);

  if (_AMENITIES_DATA) {
    for (var i = 0; i < 12; i++)
      if (SELETED_AMEN_IND_LIST.includes(i)) {
        button_set_1.push(
          <div className={styles.buttonRow} key={_AMENITIES_DATA[i]["id"]}>
            <ToggleButton
              index={_AMENITIES_DATA[i]["id"]}
              buttonText={_AMENITIES_DATA[i].name}
              positionStyle={styles.amen_button}
              buttonOnclick={() => {}}
              colorIndex={parseInt(_AMENITIES_DATA[i].id) + 1}
              largeFont={false}
              selectedColor={_COLOR[parseInt(_AMENITIES_DATA[i].id) + 1]}
              dataKey="t42"
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
    for (var i = 12; i < _AMENITIES_DATA.length; i++)
      if (SELETED_AMEN_IND_LIST.includes(i)) {
        button_set_2.push(
          <div className={styles.buttonRow} key={_AMENITIES_DATA[i]["id"]}>
            <ToggleButton
              index={_AMENITIES_DATA[i]["id"]}
              buttonText={_AMENITIES_DATA[i].name}
              positionStyle={styles.amen_button}
              buttonOnclick={() => {}}
              colorIndex={parseInt(_AMENITIES_DATA[i].id) + 1}
              largeFont={false}
              selectedColor={_COLOR[parseInt(_AMENITIES_DATA[i].id) + 1]}
              dataKey="t42"
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

  return (
    <>
      <div className={styles.container} id="protected_c">
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Community Endowment Usage</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Please drag in/out the amenities to the rectangle area to propose
            your amenity composition.
          </div>
        </div>
        <IndicatorCard />
        <div className={styles.rowGroup}>
          <div className={styles.amen_list}>{button_set_1}</div>
          <div className={styles.amen_list}>{button_set_2}</div>
        </div>
      </div>

      <div className={styles.hint}>
        {"Test around. Hit the button once you decide ->"}
      </div>
      <CustomButton
        buttonText="Submit"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default EndowmentVotingPage;

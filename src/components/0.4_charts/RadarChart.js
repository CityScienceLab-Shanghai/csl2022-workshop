import React, { useEffect, useRef, useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import * as d3 from "d3";

import SELETED_AMEN_IND_LIST from "../../data/tutorial/tutorial_amen_result.json";
import _AMENITIES_DATA from "../../data/sandbox/amenities.json";

import { stateStore } from "../../stores";

const RadarChart = ({ data, dataKey = "ks" }) => {
  const {
    selected,
    tutorial_selected,
    radarCharts,
    setRadarCharts,
    simple_sandbox_slider_value_1,
    simple_sandbox_slider_value_2,
    tutorial_sandbox_slider_value,
  } = stateStore;

  const ref = useRef();
  let svg = d3.select(ref.current);

  useEffect(() => {
    svg.selectAll("circle").attr("stroke", "rgba(69, 69, 69, 1)");
    svg.selectAll("line").attr("stroke", "rgba(69, 69, 69, 1)");
    svg
      .selectAll("text")
      .style("font-family", "Inter")
      .style("font-weight", "400")
      .style("fill", "#EBEBEB");
  });

  useEffect(() => {
    let newObj = JSON.parse(JSON.stringify(radarCharts["ks"]));
    // console.log(newObj)

    for (let i = 0; i < 5; ++i) {
      newObj[i]["Proposal"] = newObj[i]["Baseline"];
    }

    let sunlightRedu =
      (simple_sandbox_slider_value_1 + simple_sandbox_slider_value_2) * 2;

    newObj[0]["Proposal"] = newObj[0]["Proposal"] - sunlightRedu;
    newObj[1]["Proposal"] = newObj[1]["Proposal"] - sunlightRedu / 2;

    Object.keys(selected).forEach(function (key) {
      if (selected[key]) {
        newObj[0]["Proposal"] = newObj[0]["Proposal"] + _AMENITIES_DATA[key]['traffic'];
        newObj[1]["Proposal"] = newObj[1]["Proposal"] + _AMENITIES_DATA[key]['sunlight'];
        newObj[2]["Proposal"] = newObj[2]["Proposal"] + _AMENITIES_DATA[key]['carbon'];
        newObj[3]["Proposal"] = newObj[3]["Proposal"] + 5;
        newObj[4]["Proposal"] = newObj[4]["Proposal"] + _AMENITIES_DATA[key]['equity'];
      }
    });

    setRadarCharts("ks", newObj);
  }, [selected, simple_sandbox_slider_value_1, simple_sandbox_slider_value_2]);

  // listen to tutorial 2.2
  useEffect(() => {
    let newObj = JSON.parse(JSON.stringify(radarCharts["t22"]));

    for (let i = 0; i < 5; ++i) {
      newObj[i]["Proposal"] = newObj[i]["Baseline"];
    }

    let sunlightRedu = tutorial_sandbox_slider_value * 4;
    newObj[0]["Proposal"] = newObj[0]["Proposal"] - sunlightRedu;
    newObj[1]["Proposal"] = newObj[1]["Proposal"] - sunlightRedu / 2;

    setRadarCharts("t22", newObj);
  }, [tutorial_sandbox_slider_value]);

  // listen to tutorial 4.2
  useEffect(() => {
    let newObj = JSON.parse(JSON.stringify(radarCharts["t42"]));

    for (let i = 0; i < 5; ++i) {
      newObj[i]["Proposal"] = newObj[i]["Baseline"];
    }

    Object.keys(tutorial_selected).forEach(function (key) {
      if (tutorial_selected[key]) {
        newObj[0]["Proposal"] = newObj[0]["Proposal"] + _AMENITIES_DATA[key]['traffic'];
        newObj[1]["Proposal"] = newObj[1]["Proposal"] + _AMENITIES_DATA[key]['sunlight'];
        newObj[2]["Proposal"] = newObj[2]["Proposal"] + _AMENITIES_DATA[key]['carbon'];
        newObj[3]["Proposal"] = newObj[3]["Proposal"] + 5;
        newObj[4]["Proposal"] = newObj[4]["Proposal"] + _AMENITIES_DATA[key]['equity'];
      }
    });

    setRadarCharts("t42", newObj);
  }, [tutorial_selected]);

  // listen to tutorial 2.4
  useEffect(() => {
    let newObj = JSON.parse(JSON.stringify(radarCharts["t24"]));

    for (let i = 0; i < 5; ++i) {
      newObj[i]["Proposal"] = newObj[i]["Baseline"];
    }

    let sunlightRedu = 5 * 4;
    newObj[0]["Proposal"] = newObj[0]["Proposal"] - sunlightRedu;
    newObj[1]["Proposal"] = newObj[1]["Proposal"] - sunlightRedu / 2;

    setRadarCharts("t24", newObj);
  }, []);

  // listen to tutorial 4.4
  useEffect(() => {
    let newObj = JSON.parse(JSON.stringify(radarCharts["t44"]));

    for (let i = 0; i < 5; ++i) {
      newObj[i]["Proposal"] = newObj[i]["Baseline"];
    }

    for (let i = 0; i < SELETED_AMEN_IND_LIST.length; ++i) {
      let key = SELETED_AMEN_IND_LIST[i];
      newObj[1]["Proposal"] = newObj[1]["Proposal"] + 6;
      newObj[2]["Proposal"] = newObj[2]["Proposal"] + 4;
      newObj[3]["Proposal"] = newObj[3]["Proposal"] + 3;
      newObj[4]["Proposal"] = newObj[4]["Proposal"] + 5;
    }

    setRadarCharts("t44", newObj);
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <ResponsiveRadar
        data={radarCharts[dataKey]}
        keys={["Proposal", "Baseline"]}
        indexBy="IndicatorType"
        valueFormat=">-.2f"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={18}
        dotSize={3}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={["rgb(234, 76, 111, 0.5)", "rgb(36, 83, 255, 0.5)"]}
        // blendMode="multiply"
        motionConfig="wobbly"
        maxValue={100}
        gridLevels={9}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     translateX: -150,
        //     translateY: -140,
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemTextColor: "#999",
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "#000",
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};

export default RadarChart;

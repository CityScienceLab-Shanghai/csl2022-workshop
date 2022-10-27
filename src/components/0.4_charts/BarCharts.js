import React, { useEffect, useRef, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import styles from "./BarCharts.module.css";
import * as d3 from "d3";

import _AMENITIES_DATA from "../../data/sandbox/amenities.json";

import { stateStore } from "../../stores";

const BarChart = ({
  data,
  maxValue = 500000,
  horizontal = false,
  dataKey = "ks",
}) => {
  const {
    barCharts,
    updateBarCharts,
    selected,
    tutorial_selected,
    simple_sandbox_slider_value_1,
    simple_sandbox_slider_value_2,
    tutorial_sandbox_slider_value,
    _PRICE_FLOOR
  } = stateStore;

  const ref = useRef();
  let svg = d3.select(ref.current);

  useEffect(() => {
    svg.selectAll("line").attr("stroke", "rgba(69, 69, 69, 1)");
    svg
      .selectAll("text")
      .style("font-family", "Inter")
      .style("font-weight", "400")
      .style("fill", "#EBEBEB");
  });

  // listen to kendall square simulation
  useEffect(() => {
    let proposal = barCharts["ks"][1]["value"];

    proposal +=
      (simple_sandbox_slider_value_1 + simple_sandbox_slider_value_2) *
      _PRICE_FLOOR;

    Object.keys(selected).forEach(function (key) {
      if (selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"]);
      //   if (selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"]) + 1;
    });

    updateBarCharts("ks", 0, proposal);
  }, [selected, simple_sandbox_slider_value_1, simple_sandbox_slider_value_2]);

  // listen to tutorial 2.2
  useEffect(() => {
    let proposal = barCharts["t22"][1]["value"];

    proposal += tutorial_sandbox_slider_value * _PRICE_FLOOR;

    updateBarCharts("t22", 0, proposal);
  }, [tutorial_sandbox_slider_value]);

  // listen to tutorial 4.2
  useEffect(() => {
    let proposal = barCharts["t42"][1]["value"];

    Object.keys(tutorial_selected).forEach(function (key) {
      if (tutorial_selected[key])
        proposal -= parseInt(_AMENITIES_DATA[key]["cost"]);
      // if (tutorial_selected[key]) proposal -= parseInt(_AMENITIES_DATA[key]["cost"]) + 1;
    });

    updateBarCharts("t42", 0, proposal);
  }, [tutorial_selected]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <ResponsiveBar
        layout={horizontal ? "horizontal" : "vertical"}
        data={barCharts[dataKey]}
        keys={["value"]}
        indexBy="type"
        margin={
          horizontal
            ? { top: 30, right: 30, bottom: 30, left: 30 }
            : { top: 10, right: 0, bottom: 40, left: 0 }
        }
        padding={0.3}
        minValue={0}
        maxValue={maxValue}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat=" >-$.4s"
        colors={["rgb(234, 76, 111, 0.2)", "rgb(36, 83, 255, 0.2)"]}
        colorBy="indexValue"
        isInteractive={false}
        borderWidth={2}
        borderColor={{ from: "color" }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        // enableGridY={true}
        enableGridY={false}
        axisBottom={
          horizontal
            ? null
            : {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: "country",
                // legendPosition: "middle",
                legendOffset: 32,
              }
        }
        // axisLeft={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   // legend: "food",
        //   // legendPosition: "middle",
        //   legendOffset: -40,
        // }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        motionConfig="slow"
      />
    </div>
  );
};

export default BarChart;

import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styles from "./BarCharts.module.css";

const BarChart = ({ data, maxValue = 1 }) => (
  <ResponsiveBar
    data={data}
    keys={["value"]}
    indexBy="type"
    margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
    padding={0.3}
    minValue={0}
    maxValue={maxValue}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat=" >-$.4~"
    colors={["rgb(234, 76, 111, 0.2)", "rgb(36, 83, 255, 0.2)"]}
    colorBy="indexValue"
    isInteractive={false}
    borderWidth={2}
    borderColor={{ from: "color" }}
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    // axisBottom={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   // legend: "country",
    //   // legendPosition: "middle",
    //   legendOffset: 32,
    // }}
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
    motionConfig="stiff"
  />
);

export default BarChart;

import React, { useEffect, useRef, useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import * as d3 from "d3";

import { stateStore } from "../../stores";

const RadarChart = ({ data, dataKey }) => {
  const { radarCharts } = stateStore;

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

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <ResponsiveRadar
        data={radarCharts["ks"]}
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

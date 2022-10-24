import * as React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = ({ data }) => (
  <ResponsiveRadar
    data={data}
    keys={["Proposal", "Baseline"]}
    indexBy="IndicatorType"
    valueFormat=">-.2f"
    margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
    borderColor={{ from: "color" }}
    gridLabelOffset={36}
    dotSize={3}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={["rgb(234, 76, 111, 0.2)", "rgb(36, 83, 255, 0.2)"]}
    blendMode="multiply"
    motionConfig="wobbly"
    maxValue={100}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        translateX: -150,
        translateY: -140,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default RadarChart;
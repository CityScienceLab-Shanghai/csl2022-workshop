import React, { useEffect, useRef, useState } from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";

import * as d3 from "d3";

const TreeMap = ({ data, colors, weighted = false }) => {
  const ref = useRef();
  let svg = d3.select(ref.current);

  //   useEffect(() => {
  //     svg.selectAll("line").attr("stroke", "rgba(69, 69, 69, 1)");
  //     svg
  //       .selectAll("text")
  //       .style("font-family", "Inter")
  //       .style("font-weight", "400")
  //       .style("fill", "#EBEBEB");
  //   });

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value={weighted ? "token" : "ppl"}
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        colors={colors}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.1]],
        }}
      />
    </div>
  );
};

export default TreeMap;

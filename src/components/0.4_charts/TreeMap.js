import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useResizeObserver } from "../../utils/useResizeObserver";

const TreeMap = ({ data, colors, weighted = false }) => {
  const margin = {
    top: 40,
    left: 0,
    bottom: 40,
    right: 0,
  };

  const ref = useRef();
  const containerRef = useRef();
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);
  
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
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={ref}>
        {/* Main Chart */}
        <g />
        <line id="xAxis" />
        <line id="yAxis" />
        <text id="AxisTextRight" />
        <text id="AxisTextZero" />
        <text id="AxisTextUp" />

        {/* Avg Line */}
        <line id="avgLine" />
        <text id="avgText" />

        {/* User Arrow */}
        <text id="userText" />
        <text id="userArrow" />
      </svg>
    </div>
  );
};

export default TreeMap;

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useResizeObserver } from "../../utils/useResizeObserver";

const TreeMap = ({ data, colors, isWeighted = false }) => {
  const margin = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const ref = useRef();
  const containerRef = useRef();
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  useEffect(() => {
    if (!containerWidth) return;

    //calc width and height based on container size and margin
    let width = containerWidth - margin.left - margin.right;
    let height = containerHeight - margin.top - margin.bottom;

    // build SVG
    let svg = d3
      .select(ref.current)
      .attr("height", containerHeight)
      .attr("width", containerWidth);

    svg
      .select("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // build data
    let root = d3.hierarchy(data).sum((d) => (isWeighted ? d.value : 1));
    let color = d3
      .scaleOrdinal()
      .domain(["boss1", "boss2", "boss3"])
      .range(["#402D54", "#D18975", "#8FD175"]);

    d3
      .treemap()
      .size([width, height])
      .paddingTop(28)
    //   .paddingRight(7)
      .paddingInner(3)(root);

    // console.log(root.leaves());

    // create Chart
    svg
      .select("g")
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "black")
      //   .style("fill", (d) => color(d.parent.data.name))
      .style("fill", (d) => "white")
      .style("opacity", (d) => 1);

    // and to add the text labels
    svg
      .select("g")
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", (d) => {
        return d.x0 + 5;
      })
      .attr("y", (d) => {
        return d.y0 + 20;
      })
      .text((d) => {
        return d.data.name.replace("mister_", "");
      })
      .attr("font-size", "19px")
      .attr("fill", "black");

    // Add title for the 3 groups
    svg
      .select("g")
      .selectAll("titles")
      .data(
        root.descendants().filter(function (d) {
          return d.depth == 1;
        })
      )
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0 + 21;
      })
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "19px")
      //   .attr("fill", function (d) {
      //     return color(d.data.name);
      //   });
      .style("fill", (d) => "white");
  }, [data, containerWidth, containerHeight]);

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

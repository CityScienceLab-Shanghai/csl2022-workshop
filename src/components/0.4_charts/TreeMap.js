import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useResizeObserver } from "../../utils/useResizeObserver";

import _AMENITIES_DATA from "../../data/sandbox/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";

const TreeMap = ({
  agent_id,
  agent_value,
  agent_weight,
  isWeighted = false,
  userValue,
  userWeight,
}) => {
  const margin = {
    top: -20,
    left: 0,
    bottom: 0,
    right: 0,
  };

  // build data
  let data = {
    name: "DAO",
    children: [],
  };

  for (var i = 0; i < _AMENITIES_DATA.length; i++) {
    let newObj = {
      name: _AMENITIES_DATA[i].name,
      children: [],
      color: _COLOR[i + 1],
      total: 0,
    };
    data.children.push(newObj);
  }

  for (var i = 0; i < agent_id.length; i++) {
    for (var j = 0; j < agent_value[i].length; j++) {
      let newObj = {
        name: agent_id[i],
        weight: agent_weight[i],
      };
      let amen_id = agent_value[i][j];
      data.children[amen_id].children.push(newObj);
      data.children[amen_id].total += agent_weight[i];
    }
  }

  // filter empty keys
  data.children = data.children.filter((value, index, arr) => {
    return value.children.length > 0;
  });

  console.log(data);

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
    let root = d3
      .hierarchy(data)
      .sum((d) => (isWeighted ? d.weight : d.weight));

    d3
      .treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingRight(7)
      .paddingInner(3)(root);

    console.log(root.leaves());

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
      .style("fill", (d) => d.parent.data.color)
      .style("opacity", (d) => 1);

    // and to add the text labels
    svg
      .select("g")
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", (d) => d.x0 + 5)
      .attr("y", (d) => d.y0 + 20)
      .text((d) => d.data.name)
      .attr("font-size", "17px")
      .attr("fill", "white")
      .attr("font-family", "Inter");

    // and to add the text labels
    svg
      .select("g")
      .selectAll("vals")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", (d) => d.x0 + 5) // +10 to adjust position (more right)
      .attr("y", (d) => d.y0 + 35) // +20 to adjust position (lower)
      .text((d) => d.data.weight)
      .attr("font-size", "11px")
      .attr("fill", "white");

    // Add title for the groups
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
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0 + 21)
      .text((d) => d.data.name + ":" + d.data.total)
      .attr("font-size", "19px")
      .attr("fill", (d) => d.data.color)
      .attr("font-family", "Inter");
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

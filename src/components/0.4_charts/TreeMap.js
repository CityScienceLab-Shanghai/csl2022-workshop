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
  userValue = undefined,
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
        weight: isWeighted ? agent_weight[i] : 1,
      };
      let amen_id = agent_value[i][j];
      data.children[amen_id].children.push(newObj);
      data.children[amen_id].total += newObj["weight"];
    }
  }

  // Add user input if available
  if (userValue) {
    console.log(userValue);
    Object.keys(userValue).forEach(function (key) {
      if (userValue[key]) {
        let newObj = {
          name: "You",
          weight: isWeighted ? userWeight : 1,
        };
        let amen_id = key;
        data.children[amen_id].children.push(newObj);
        data.children[amen_id].total += newObj["weight"];
      }
    });
  }

  // filter empty keys
  data.children = data.children.filter((value, index, arr) => {
    return value.children.length > 0;
  });

  //   console.log(data);

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
    let root = d3.hierarchy(data).sum((d) => d.weight);

    d3
      .treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingRight(7)
      .paddingInner(3)(root);

    // console.log(root.leaves());

    // create Chart
    svg
      .select("g")
      .selectAll("rect")
      .data(root.leaves())
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0)
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0)
            .style("stroke", (d) => (d.data.name == "You" ? "white" : "black"))
            .style("stroke-width", "2px")
            .style("stroke-dasharray", (d) =>
              d.data.name == "You" ? "5, 5" : ""
            )
            .style("fill", (d) => d.parent.data.color)
            .style("opacity", (d) => 1),
        (update) =>
          update
            .transition()
            .duration(700)
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0)
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0)
            .style("stroke", (d) => (d.data.name == "You" ? "white" : "black"))
            .style("stroke-width", "1.5px")
            .style("stroke-dasharray", (d) =>
              d.data.name == "You" ? "5, 5" : ""
            )
            .style("fill", (d) => d.parent.data.color)
            .style("opacity", (d) => 1)
      );

    // and to add the text labels
    svg
      .select("g")
      .selectAll(".ids")
      .data(root.leaves())
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "ids")
            .attr("x", (d) => d.x0 + 5)
            .attr("y", (d) => d.y0 + 20)
            .text((d) => (d.x1 - d.x0 > 30 ? d.data.name : ""))
            .attr("font-size", (d) => (d.data.name == "You" ? "14px" : "17px"))
            .attr("fill", "white")
            .attr("font-family", "Inter"),
        (update) =>
          update
            .transition()
            .duration(700)
            .attr("x", (d) => d.x0 + 5)
            .attr("y", (d) => d.y0 + 20)
            .text((d) => (d.x1 - d.x0 > 30 ? d.data.name : ""))
            .attr("font-size", (d) => (d.data.name == "You" ? "14px" : "17px"))
            .attr("fill", "white")
            .attr("font-family", "Inter")
      );

    // and to add the text labels
    svg
      .select("g")
      .selectAll(".vals")
      .data(root.leaves())
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "vals")
            .attr("x", (d) => d.x0 + 5) // +10 to adjust position (more right)
            .attr("y", (d) => d.y0 + 35) // +20 to adjust position (lower)
            .text((d) => (d.x1 - d.x0 > 30 ? d.data.weight : ""))
            .attr("font-size", "11px")
            .attr("fill", "white"),
        (update) =>
          update
            .text((d) => (d.x1 - d.x0 > 30 ? d.data.weight : ""))
            .transition()
            .duration(700)
            .attr("x", (d) => d.x0 + 5) // +10 to adjust position (more right)
            .attr("y", (d) => d.y0 + 35) // +20 to adjust position (lower)
            .attr("font-size", "11px")
            .attr("fill", "white")
      );

    // Add title for the groups
    svg
      .select("g")
      .selectAll(".title")
      .data(
        root.descendants().filter(function (d) {
          return d.depth == 1;
        })
      )
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "title")
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0 + 21)
            .text((d) => d.data.name + ":" + d.data.total)
            .attr("font-size", "19px")
            .attr("fill", (d) => d.data.color)
            .attr("font-family", "Inter"),
        (update) =>
          update
            .text((d) => d.data.name + ":" + d.data.total)
            .transition()
            .duration(700)
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0 + 21)
            .attr("font-size", "19px")
            .attr("fill", (d) => d.data.color)
            .attr("font-family", "Inter")
      );
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

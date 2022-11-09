import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useResizeObserver } from "../../utils/useResizeObserver";

const getRgb = (color) => {
  let [r, g, b] = Array.from(color);
  return {
    r,
    g,
    b,
  };
};

const colorInterpolate = (colorA, colorB, intval) => {
  const rgbA = getRgb(colorA);
  const rgbB = getRgb(colorB);
  const colorVal = (prop) =>
    Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
  return [colorVal("r"), colorVal("g"), colorVal("b")];
};

const sum = (arr) => {
  return arr.reduce(function (acr, cur) {
    return acr + cur;
  });
};

const getAvg = (arr, weight) => {
  let s = 0;
  for (var i = 0; i < arr.length; i++) {
    s += arr[i] * weight[i];
  }

  s = s / sum(weight);
  s = Math.ceil(s);

  return s;
};

const getIndex = (arr) => {
  let s = 0;
  let res = [];
  for (var i = 0; i < arr.length; i++) {
    res.push(s);
    s += arr[i];
  }
  return res;
};

const Histogram = ({
  agent_value,
  agent_weight,
  userValue,
  userWeight,
  isWeighted = false,
}) => {
  const ref = useRef();
  const containerRef = useRef();

  const margin = {
    top: 40,
    left: 0,
    bottom: 40,
    right: 0,
  };
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  let sort_list = [{ value: userValue, weight: userWeight }];
  for (let i = 0; i < agent_value.length; i++) {
    sort_list.push({ value: agent_value[i], weight: agent_weight[i] });
  }
  sort_list.sort((a, b) => {
    return a.value - b.value;
  });

  let data = [];
  let weight = [];
  for (let i = 0; i < sort_list.length; i++) {
    data.push(sort_list[i].value);
    weight.push(sort_list[i].weight);
  }

  let xIndex = getIndex(weight);
  let userIndex = data.indexOf(userValue);

  useEffect(() => {
    const height = containerHeight ? containerHeight : 0;
    const width = containerWidth ? containerWidth : 500;

    if (!containerWidth) return;

    // histogram bars attr
    let barPadding = 2;
    let barWdith = (width - margin.right - margin.left) / sum(weight);
    let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));
    let longestBarPadding = 0;

    let xscale = d3
      .scaleLinear()
      .domain([0, sum(weight)])
      .range([margin.left, width - margin.right - margin.left]);

    let yrange =
      height - longestBarPadding - margin.bottom - margin.top > 0
        ? height - longestBarPadding - margin.bottom - margin.top
        : 0;

    let yscale = d3
      .scaleLinear()
      .domain([-1, d3.max(data)])
      .range([0, yrange]);

    let yUnit = yscale(1) - yscale(0);

    let avgFloor = getAvg(data, weight);

    // build SVG
    let svg = d3
      .select(ref.current)
      .attr("height", "100%")
      .attr("width", "100%");

    // create Chart
    svg
      .select("g")
      .attr("class", "rect")
      .selectAll("rect")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("height", (d) =>
              d3.min(data) >= 0
                ? yscale(d)
                : d > 0
                ? yscale(d) - yscale(0)
                : yscale(0) - yscale(d)
            )
            .attr("y", (d) =>
              d3.min(data) >= 0
                ? height - yscale(d) - margin.bottom
                : d > 0
                ? margin.bottom + yscale(0)
                : margin.bottom + yscale(d)
            )
            .attr("x", (d, i) => xscale(xIndex[i]) + barPadding)
            .attr("width", (d, i) =>
              barWdith * weight[i] - barPadding >= 0
                ? barWdith * weight[i] - barPadding
                : 0
            )
            .attr("fill", (d, i) =>
              d3.rgb(
                ...colorInterpolate([22, 48, 145], [132, 43, 64], data[i] / 10)
              )
            )
            .attr("class", (d, i) => {
              // console.log(i, userIndex)
              if (i == userIndex) return "userbar";
              else return "agentbar";
            })
            .attr("value", (d) => d)
            .selection(),
        (update) =>
          update
            .attr("height", (d) =>
              d3.min(data) >= 0
                ? yscale(d)
                : d > 0
                ? yscale(d) - yscale(0)
                : yscale(0) - yscale(d)
            )
            .attr("y", (d) =>
              d3.min(data) >= 0
                ? height - yscale(d) - margin.bottom
                : d > 0
                ? margin.bottom + yscale(0)
                : margin.bottom + yscale(d)
            )
            .transition()
            .duration(700)
            .attr("x", (d, i) => xscale(xIndex[i]) + barPadding)
            .attr("width", (d, i) =>
              barWdith * weight[i] - barPadding >= 0
                ? barWdith * weight[i] - barPadding
                : 0
            )
            .attr("fill", (d, i) =>
              d3.rgb(
                ...colorInterpolate([22, 48, 145], [132, 43, 64], data[i] / 10)
              )
            )
            .attr("class", (d, i) => {
              // console.log(i, userIndex)
              if (i == userIndex) return "userbar";
              else return "agentbar";
            })
            .attr("value", (d) => d)
            .selection()
      );

    // // clear Chart
    // svg
    //   .select("g")
    //   .attr("class", "rect")
    //   .selectAll("rect")
    //   .data(data)
    //   .exit()
    //   .remove();

    // draw Lines
    svg
      .select("#xAxis")
      .attr("y1", height - margin.bottom)
      .attr("x1", xscale(0))
      .attr("y2", height - margin.bottom)
      .attr("x2", xscale(sum(weight)))
      .style("stroke", "white")
      .style("stroke-width", 2)
      .attr("index", 0);
    svg
      .select("#yAxis")
      .attr("y1", height - margin.bottom)
      .attr("x1", xscale(0))
      .attr("y2", margin.top)
      .attr("x2", xscale(0))
      .style("stroke", "white")
      .style("stroke-width", 2)
      .attr("index", 0);

    svg
      .select("#AxisTextUp")
      .attr("x", xscale(0))
      .attr("y", margin.top - 5)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "14")
      .attr("fill", "white")
      .attr("text-anchor", "Start")
      .text("10 Floors");

    svg
      .select("#AxisTextRight")
      .attr("x", xscale(sum(weight)))
      .attr("y", height - margin.bottom + 20)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "14")
      .attr("fill", "white")
      .attr("text-anchor", "End")
      .text("Participants");

    svg
      .select("#AxisTextZero")
      .attr("x", xscale(0))
      .attr("y", height - margin.bottom + 20)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "14")
      .attr("fill", "white")
      .attr("text-anchor", "Start")
      .text("0");

    // avg line
    svg
      .select("#avgLine")
      .transition()
      .duration(700)
      .attr("y1", height - margin.bottom - yscale(avgFloor))
      .attr("x1", xscale(0))
      .attr("y2", height - margin.bottom - yscale(avgFloor))
      .attr("x2", xscale(sum(weight)))
      .style("stroke", "#EA4C6F")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "3 2")
      .attr("index", 0);

    svg
      .select("#avgText")
      .transition()
      .duration(700)
      .attr("x", xscale(0) + 10)
      .attr("y", height - margin.bottom - yscale(avgFloor) - 5)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "14")
      .attr("fill", "#EA4C6F")
      .attr("text-anchor", "Start")
      .text(`Result: ${avgFloor} floors`);

    let userHintX = xscale(xIndex[userIndex]) + barPadding + barWdith / 2;
    let userHintY = svg.select(".userbar").empty()
      ? 0
      : svg.select(".userbar").attr("y");
    svg
      .select("#userText")
      .transition()
      .duration(700)
      .attr("x", userHintX)
      .attr("y", userHintY - 20)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "16")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text(`You`);

    svg
      .select("#userArrow")
      .transition()
      .duration(700)
      .attr("x", userHintX)
      .attr("y", userHintY - 5)
      .attr("class", "small-font")
      .attr("style", "font-family:Inter")
      .attr("font-size", "16")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text(`↓`);

    svg
      .select(".userbar")
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .style("stroke-dasharray", "5 5");
  }, [data, weight, containerWidth, containerHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
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
      <>
        <img
          style={{
            position: "absolute",
            top: "708px",
            left: "65px",
            opacity: isWeighted ? 1 : 0,
            transition: "opacity 0.7s",
          }}
          src={`weighting/person_a.png`}
        />
        <img
          style={{
            position: "absolute",
            top: "702px",
            left: "368px",
            opacity: isWeighted ? 1 : 0,
            transition: "opacity 0.7s",
          }}
          src={`weighting/person_b.png`}
        />
        <img
          style={{
            position: "absolute",
            top: "708px",
            left: "687px",
            opacity: isWeighted ? 1 : 0,
            transition: "opacity 0.7s",
          }}
          src={`weighting/person_c.png`}
        />
      </>
    </div>
  );
};

export default Histogram;

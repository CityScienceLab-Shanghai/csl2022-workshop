import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useResizeObserver } from "../../utils/useResizeObserver";
import SEQ_COLOR from "../../data/color/sequential_color_palette.json";

const getRgb = (color) => {
  let [r, g, b] = Array.from(color);
  return {
    r,
    g,
    b,
  };
};

const unique = (arr) => {
  return Array.from(new Set(arr));
};

const colorInterpolate = (colorA, colorB, intval) => {
  const rgbA = getRgb(colorA);
  const rgbB = getRgb(colorB);
  console.log(rgbA);
  const colorVal = (prop) =>
    Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
  return [colorVal("r"), colorVal("g"), colorVal("b")];
};

const getDataToVis = (
  rawIssueData,
  selectedSpecificIssue,
  issues,
  rawIssueGoodBad
) => {
  let valueArray = [];
  let nameArray = [];
  let ascending;
  let lookupArray = [];

  rawIssueData.sort((a, b) => a.rank - b.rank);

  for (let [index, value] of Object.entries(rawIssueData)) {
    valueArray.push(Number(Number(value.data).toFixed(3)));
    nameArray.push(value.community);
    lookupArray.push(value.community_ID);
  }

  const isTemperature =
    issues.specific_issues_data[selectedSpecificIssue].json_id == "F14_TmpDev"
      ? true
      : false;

  // get the corresponding index of average value
  let sum = valueArray.reduce((a, b) => a + b, 0);
  // let avg = Number(sum / valueArray.length);
  let avg = isTemperature ? 0 : Number(sum / valueArray.length);
  let avgIndex;

  for (let i = 0; i < valueArray.length - 1; i++) {
    if (valueArray[i] < avg && valueArray[i + 1] > avg) {
      avgIndex =
        i + (avg - valueArray[i]) / (valueArray[i + 1] - valueArray[i]);
      ascending = true;
      break;
    }

    if (valueArray[i] > avg && valueArray[i + 1] < avg) {
      avgIndex =
        i + 1 - (avg - valueArray[i + 1]) / (valueArray[i] - valueArray[i + 1]);
      ascending = false;
      break;
    }
  }

  if (rawIssueGoodBad == 0) {
    valueArray.reverse();
    avgIndex = valueArray.length - avgIndex;
  }

  return [
    valueArray,
    nameArray,
    avg,
    avgIndex,
    ascending,
    lookupArray,
    isTemperature,
  ];
};

const sum = (arr) => {
  return arr.reduce(function (acr, cur) {
    return acr + cur;
  });
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

const Histogram = ({ data, weight, isWeighted = false }) => {
  const ref = useRef();
  const containerRef = useRef();

  const textWidth = 50;
  const margin = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  let xIndex = getIndex(weight);

  useEffect(() => {
    const height = containerHeight ? containerHeight : 0;
    const width = containerWidth ? containerWidth : 500;

    // histogram bars attr
    let barPadding = 2;
    let barWdith = (width - margin.right - margin.left) / sum(weight);
    let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));
    let longestBarPadding = 0;

    console.log(sum(weight));
    console.log(barWdith);

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
      .enter()
      .append("rect")
      .merge(svg.select("g").attr("class", "rect").selectAll("rect").data(data))
      .attr("width", (d, i) =>
        barWdith * weight[i] - barPadding >= 0
          ? barWdith * weight[i] - barPadding
          : 0
      )
      .attr("height", (d) =>
        d3.min(data) >= 0
          ? yscale(d)
          : d > 0
          ? yscale(d) - yscale(0)
          : yscale(0) - yscale(d)
      )
      .attr("x", (d, i) => xscale(xIndex[i]))
      .attr("y", (d) =>
        d3.min(data) >= 0
          ? height - yscale(d) - margin.bottom
          : d > 0
          ? margin.bottom + yscale(0)
          : margin.bottom + yscale(d)
      )
      //   .attr("fill", (d, i) => SEQ_COLOR[data[i]])
      .attr("fill", (d, i) =>
        d3.rgb(...colorInterpolate([22, 48, 145], [132, 43, 64], data[i] / 10))
      )
      .attr("value", (d) => d);

    // clear Chart
    svg
      .select("g")
      .attr("class", "rect")
      .selectAll("rect")
      .data(data)
      .exit()
      .remove();
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
        {/* Avg Line */}
        <line id="avgLine" />
        <text id="avgTextUp" />
        <text id="avgTextDown" />
      </svg>
    </div>
  );
};

export default Histogram;

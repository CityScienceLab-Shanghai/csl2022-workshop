import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { useResizeObserver } from '../utils/useResizeObserver';

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
  const colorVal = (prop) =>
    Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
  return [colorVal('r'), colorVal('g'), colorVal('b')];
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
    issues.specific_issues_data[selectedSpecificIssue].json_id == 'F14_TmpDev'
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

const IssueHistogram = ({

}) => {
  const ref = useRef();
  const containerRef = useRef();


  const textWidth = 50;
  const margin = {
    top: 25,
    left: 10,
    bottom: 25,
    right: 10,
  };
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  let colorRamps = _CHAPTER_COLORS[getIssueType(issues, selectedSpecificIssue)];
  let rawIssueData =
    _RANKINGS[boundary][
      issues.specific_issues_data[selectedSpecificIssue].json_id
    ];
  let rawIssueGoodBad =
    issues.specific_issues_data[selectedSpecificIssue].good_or_bad;
  let [data, nameArray, avg, avgIndex, ascending, lookupArray, isTemperature] =
    getDataToVis(rawIssueData, selectedSpecificIssue, issues, rawIssueGoodBad);

  let selectedIndex = communitySearch
    ? rawIssueGoodBad
      ? lookupArray.indexOf(communitySearch)
      : lookupArray.length - lookupArray.indexOf(communitySearch) - 1
    : 0;

  let compareIndex = compareSearch
    ? rawIssueGoodBad
      ? lookupArray.indexOf(compareSearch)
      : lookupArray.length - lookupArray.indexOf(compareSearch) - 1
    : 0;

  let metricSymbol =
    issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol !== ''
      ? `${issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol} ${issues.specific_issues_data[selectedSpecificIssue].units_shorthand}`
      : '';

  //   console.log('------');
  //   console.log('specificIssue', selectedSpecificIssue);
  //   console.log('issues', issues);
  //   console.log('issues', issues.issues_data['environment'].specific_issues_ID);
  //   console.log('issues type', getIssueType(issues, selectedSpecificIssue));
  //   console.log('boundary', boundary);
  //   console.log(
  //     'json_id',
  //     issues.specific_issues_data[selectedSpecificIssue].json_id
  //   );
  //   console.log('_RANKINGS', _RANKINGS[boundary]);
  //   console.log('selectedCommunity', selectedCommunity);
  //   console.log('communitySearch', communitySearch);
  //   console.log('compareSearch', compareSearch);
  //   console.log('selectedCommunity.json_lookup', selectedCommunity.json_lookup);
  //   console.log('rank', selectedIndex);
  //   console.log('------');

  useEffect(() => {
    const height = containerHeight ? containerHeight : 0;
    const width = containerWidth ? containerWidth : 500;

    // histogram bars attr
    let barPadding = 0;
    let barWdith = (width - margin.right - margin.left) / data.length;
    let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));
    let longestBarPadding = 0;

    let [hiStatement, lowStatement] =
      issues.specific_issues_data[selectedSpecificIssue].issue_hi_low;
    hiStatement = hiStatement.charAt(0).toUpperCase() + hiStatement.slice(1);
    lowStatement = lowStatement.charAt(0).toUpperCase() + lowStatement.slice(1);
    // let [hiStatement, lowStatement] = ['Max', 'Min'];

    let xscale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([margin.left, width - margin.right - margin.left]);

    let yrange =
      height - longestBarPadding - margin.bottom - margin.top > 0
        ? height - longestBarPadding - margin.bottom - margin.top
        : 0;
    let yscale = d3
      .scaleLinear()
      .domain([
        d3.min(data) >= 0 ? d3.min(data) - minValueMargin : d3.min(data),
        d3.max(data),
      ])
      .range([0, yrange]);

    let yUnit = yscale(1) - yscale(0);

    // build SVG
    let svg = d3
      .select(ref.current)
      .attr('height', '100%')
      .attr('width', '100%');

    // create Chart
    svg
      .select('g')
      .attr('class', 'rect')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .merge(svg.select('g').attr('class', 'rect').selectAll('rect').data(data))
      .attr('width', barWdith - barPadding >= 0 ? barWdith - barPadding : 0)
      .attr('height', (d) =>
        d3.min(data) >= 0
          ? yscale(d)
          : d > 0
          ? yscale(d) - yscale(0)
          : yscale(0) - yscale(d)
      )
      .attr('x', (d, i) => xscale(i + 0.5))
      .attr('y', (d) =>
        d3.min(data) >= 0
          ? height - yscale(d) - margin.bottom
          : d > 0
          ? margin.bottom + yscale(0)
          : margin.bottom + yscale(d)
      )
      .attr('fill', (d, i) =>
        rawIssueGoodBad
          ? d3.rgb(
              ...colorInterpolate(
                // colorRamps[0],
                // colorRamps[colorRamps.length - 1],
                colorRamps[2],
                colorRamps[2],
                !ascending
                  ? 1 - i / (rawIssueData.length - 1)
                  : i / (rawIssueData.length - 1)
              )
            )
          : d3.rgb(
              ...colorInterpolate(
                // colorRamps[colorRamps.length - 1],
                // colorRamps[0],
                colorRamps[2],
                colorRamps[2],
                !ascending
                  ? 1 - i / (rawIssueData.length - 1)
                  : i / (rawIssueData.length - 1)
              )
            )
      )
      .attr('value', (d) => d);

    svg.selectAll('rect').each(function (d, i) {
      d3.select(this).attr('y', (d) =>
        d3.min(data) >= 0
          ? height - d3.select(this).attr('height') - margin.bottom
          : d > 0
          ? height - d3.select(this).attr('height') - margin.bottom - yscale(0)
          : height - d3.select(this).attr('height') - margin.bottom - yscale(d)
      );
    });

    // clear Chart
    svg
      .select('g')
      .attr('class', 'rect')
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();

    // draw Lines
    svg
      .select('#minLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(0.5))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(0.5))
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .attr('index', 0)
      .attr('visibility', 'hidden');

    svg
      .select('#maxLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(data.length + 0.5))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(data.length + 0.5))
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .attr('index', data.length - 1)
      .attr('visibility', 'hidden');

    // draw avg Lines
    svg
      .select('#avgLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(avgIndex + 1))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(avgIndex + 1))
      .style('stroke', 'black')
      .style('stroke-dasharray', '3, 3')
      .style('stroke-width', 1)
      .attr('index', avgIndex);

    // draw selected Lines
    svg
      .select('#selectedLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(selectedIndex + 1))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(selectedIndex + 1))
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .attr('index', selectedIndex);

    // draw Compare Lines
    if (compareSearch) {
      svg
        .select('#compareLine')
        .attr('class', 'dataLine')
        .attr('y1', margin.top)
        .attr('x1', xscale(compareIndex + 1))
        .attr('y2', height - margin.bottom)
        .attr('x2', xscale(compareIndex + 1))
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .attr('index', compareIndex);
    }

    // Align the line length with the bars
    svg.selectAll('.dataLine').each(function (d, i) {
      let index = Math.round(d3.select(this).attr('index'));
      let length =
        d3.min(data) >= 0
          ? yscale(data[index])
          : data[index] > 0
          ? yscale(data[index]) - yscale(0)
          : yscale(0) - yscale(data[index]);

    });

    svg
      .select('#minTextDown')
      .attr('x', xscale(0.5))
      //   .attr('y', height - margin.bottom + 5)
      // .attr('y', svg.select('#maxLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 15)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('font-weight', '500')
      .attr('fill', '#000000')
      //  .attr('text-anchor', 'end')
      .attr('text-anchor', 'start')
      //   .text((!ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
      .text(
        rawIssueGoodBad
          ? `${getBoundingStatement('max')}`
          : `${getBoundingStatement('min')}`
      );
    //   .text(!ascending ? ${hiStatement} ` : `${lowStatement} `);

    svg
      .select('#maxTextDown')
      .attr('x', xscale(data.length + 0.5))
      //   .attr('y', height - margin.bottom + 5)
      // .attr('y', svg.select('#maxLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 15)
      .attr('class', 'small-font')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      //   .text((ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
      .text(
        !rawIssueGoodBad
          ? `${getBoundingStatement('max')}`
          : `${getBoundingStatement('min')}`
      );
    //   .text(ascending ? `${hiStatement} ` : `${lowStatement} `);

    svg
      .select('#avgTextDown')
      .attr('x', svg.select('#avgLine').attr('x1'))
      // .attr('y', height - margin.bottom + 15)
      .attr('y', svg.select('#avgLine').attr('y1') - 14)
      .attr('class', 'small-font')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      // .attr('visibility', 'hidden')
      .text('Citywide Average');

    svg
      .select('#selectedTextDown')
      .attr('x', svg.select('#selectedLine').attr('x1'))
      // .attr('y', height - margin.bottom + 15)
      .attr('y', svg.select('#selectedLine').attr('y1') - 14)
      .attr('class', 'small-font')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      .text(`${communitySearch ? communitySearchName : 0}`);

    
    }
  }, [
    colorRamps,
    boundary,
    selectedSpecificIssue,
    selectedCommunity,
    containerWidth,
    containerHeight,
    communitySearch,
    compareSearch,
  ]);

  return (
      

      <div
        ref={containerRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <svg
          
          ref={ref}
        >
          {/* Main Chart */}
          <g />

          {/* Avg Line */}
          <line id="avgLine" />
          <text id="avgTextUp" />
          <text id="avgTextDown" />

        </svg>

      </div>
  );
};

export default IssueHistogram;

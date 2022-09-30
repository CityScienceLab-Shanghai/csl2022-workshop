import React, { useState } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";
import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { scaleThreshold } from "d3-scale";

// import floor_data from "../data/bld_floors.json";
import floor_data from "../data/processed_bld_floors.json";

// Source data GeoJSON
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json"; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
  .domain([
    -0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2,
  ])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38],
  ]);

const INITIAL_VIEW_STATE = {
  latitude: 42.35347106,
  longitude: -71.094054,
  zoom: 14,
  maxZoom: 22,
  pitch: 45,
  bearing: 0,
};

// const INITIAL_VIEW_STATE = {
//     latitude: 49.254,
//     longitude: -123.13,
//     zoom: 11,
//     maxZoom: 16,
//     pitch: 45,
//     bearing: 0
//   };

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 18),
  color: [255, 255, 255],
  intensity: 0.8,
  _shadow: true,
});

const landCover = [
  [
    [-71.004054, 42.55347106],
    [-71.004054, 42.15347106],
    [-71.304054, 42.55347106],
    [-71.304054, 42.25347106],
  ],
];

function getTooltip({ object }) {
  return (
    object && {
      html: `\
  <div><b>ID:  </b>${object.properties.ind}</div>
  <div><b>Floor:  </b>${object.properties.floor}</div>
  <div><b>Category:  </b>${object.properties.Category}</div>
  <div><b>Area:  </b>${object.properties.area}</div>
  `,
    }
  );
}

export default function Map() {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });

  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new PolygonLayer({
      id: "ground",
      data: landCover,
      stroked: false,
      getPolygon: (f) => f,
      getFillColor: [0, 0, 0, 0],
    }),
    new GeoJsonLayer({
      id: "geojson",
      data: floor_data,
      opacity: 0.8,
      stroked: false,
      //   filled: true,
      extruded: true,
      //   wireframe: true,
      //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      //   getFillColor: f => COLOR_SCALE(f.properties.growth),
      getElevation: 1,
      getFillColor: [237, 129, 62],
      getLineColor: [255, 255, 255],
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      effects={effects}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

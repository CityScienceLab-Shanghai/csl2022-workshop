import React, { useState, useEffect } from "react";

import Map from "react-map-gl";

import mapboxgl from "mapbox-gl";

import DeckGL, { FlyToInterpolator } from "@deck.gl/react";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";
import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";
// import { scaleThreshold } from "d3-scale";

// import floor_data from "../data/map/bld_floors.json";
import floor_data from "../../data/map/processed_bld_floors.json";
import CAT_COLOR from "../../data/color/categorical_color_palette.json";

import GetCircle from "./GetCircle";
import GetWalkCircle from "./GetWalkCircle";

// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// Source data GeoJSON
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json"; // eslint-disable-line

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFqYW1vYSIsImEiOiJjbDhzeDI4aHgwMXh6M3hrbmVxbG9vcDlyIn0.cdD4-PP7QcxegAsxlhC3mA";

const INITIAL_VIEW_STATE = {
  latitude: 42.36347106,
  longitude: -71.094054,
  zoom: 15,
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

// const MAP_STYLE =
//   "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 0.7,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 18),
  color: [255, 255, 255],
  intensity: 1,
  //   _shadow: true,
  _shadow: false,
});

const landCover = [
  [
    [-71.004054, 42.55347106],
    [-71.004054, 42.15347106],
    [-71.304054, 42.55347106],
    [-71.304054, 42.25347106],
  ],
];

const getTooltip = ({ object }) => {
  return (
    object && {
      html: `\
  <div><b>ID:  </b>${object.properties.ind}</div>
  <div><b>Floor:  </b>${object.properties.floor}</div>
  <div><b>Category:  </b>${object.properties.Category}</div>
  <div><b>Type:  </b>${object.properties.type.toString()}</div>
  <div><b>Area:  </b>${object.properties.area}</div>
  <div><b>ID:  </b>${object.properties.ind.toString()}</div>
  <div><b>ID has 6:  </b>${object.properties.ind.toString().indexOf("6")}</div>
  `,
    }
  );
};

const catchError = (error) => console.log("catch error", error);

export default function CityMap() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });

  let getLineColor = (data) => {
    let opacity = 0;
    if (data.properties.Category.toString().indexOf("624-4") == 0) {
      return [255, 255, 0];
    }
    return [0, 0, 0];
  };

  //   let getFillColor = (data) => {
  //     let opacity = 0;
  //     if (data.properties.ind.toString().indexOf("624-4") == 0) {
  //       opacity = 0.2;
  //       if (data.properties.floor < 4) opacity = 0.8;
  //     }
  //     return [255, 255, 255, opacity * 255];
  //   };

  //   let getFillColor = (data) => {
  //     let opacity = 0;
  //     if (data.properties.ind.toString().indexOf("624-4") == 0) {
  //       opacity = 0.2;
  //       if (data.properties.floor < 4) opacity = 0.8;
  //       //   return [237, 129, 62, opacity * 255]
  //       return [255, 255, 255];
  //     }
  //     return [255, 255, 255];
  //   };

  String.prototype.convertToRGB = function () {
    if (this.length != 6) {
      throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
    ];
    return aRgb;
  };

  let getFillColor = (data) => {
    let _color_id = data.properties.type.toString();
    console.log(_color_id)
    let _hex_color = CAT_COLOR[_color_id]
    return _hex_color.slice(1, 7).convertToRGB();
  };

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
      //   extruded: true,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 3,
      //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      //   getFillColor: f => COLOR_SCALE(f.properties.growth),
      //   getElevation: 2,
      getLineWidth: 1,
      lineWidthUnits: "meters",
      getLineColor: [255, 255, 0],

      //   getFillColor: [237, 129, 62],
      //   getLineColor: [255, 255, 0],
      getFillColor: (f) => getFillColor(f),
      getLineColor: (f) => getLineColor(f),
      //   lineWidthUnits: "common",

      pickable: true,
      autoHighlight: true,
      highlightColor: [0, 0, 128, 128],
    }),
  ];

  let displayWalkCircle = true;
  if (displayWalkCircle) {
    layers.push(...GetWalkCircle(-71.094054, 42.36347106));
  }

  return (
    <DeckGL
      layers={layers}
      effects={effects}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
      onError={catchError}
    >
      <Map
        reuseMaps
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </DeckGL>
  );
}

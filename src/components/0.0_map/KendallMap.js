import React, { useState, useEffect } from "react";

import Map from "react-map-gl";

import mapboxgl from "mapbox-gl";

import DeckGL from "@deck.gl/react";
import { FlyToInterpolator } from "@deck.gl/core";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";

import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";
// import { scaleThreshold } from "d3-scale";

// import floor_data from "../data/map/bld_floors.json";
import floor_data from "../../data/map/processed_bld_floors_small.json";
import CAT_COLOR from "../../data/color/categorical_color_palette.json";
import _BUILDINGS from "../../data/sandbox/explorable_building.json";

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
  latitude: 42.36299487835801,
  longitude: -71.08780013311475,
  zoom: 15.5,
  minZoom: 14.5,
  maxZoom: 22,
  pitch: 30,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
};

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
  <div><b>Category:  </b>${object.properties.Category}</div>
  <div><b>Area:  </b>${object.properties.area.toFixed(2)} ft^2</div>
  <div><b>Floor:  </b>${object.properties.floor}</div>
  <div><b>ID:  </b>${object.properties.ind}</div>
  `,
      style: {
        background: "#121212",
        border: "1px solid #2C2C2C",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "12px",
        color: "#FFFFFF",
      },
    }
  );
};

const catchError = (error) => console.log("catch error", error);

export default function KendallMap({ isVoting, isBuilding, buildingID }) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [layers, setLayers] = useState([]);

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
    if (false) {
      return [209, 66, 82];
    }
    return [0, 0, 0];
  };

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
    if (false) {
      return [255, 255, 255];
    }
    if (false) return [68, 68, 68];

    let _color_id = data.properties.type.toString();
    let _hex_color = CAT_COLOR[_color_id];
    return _hex_color.slice(1, 7).convertToRGB();
  };

  const basicLayers = [
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
      lineWidthMinPixels: 2,
      //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      //   getFillColor: f => COLOR_SCALE(f.properties.growth),
      //   getElevation: 2,
      getLineWidth: 1,
      lineWidthUnits: "meters",

      getFillColor: (f) => getFillColor(f),
      getLineColor: (f) => getLineColor(f),
      //   lineWidthUnits: "common",

      pickable: true,
      autoHighlight: true,
      highlightColor: [0, 0, 128, 128],

      updateTriggers: {
        getLineColor: [isBuilding],
        getFillColor: [isBuilding],
      },
    }),
  ];

  useEffect(() => {
    setLayers(basicLayers);
  }, []);

  //   let displayWalkCircle = true;
  useEffect(() => {
    // console.log(buildingID);

    if (isBuilding) {
      setLayers([
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
          lineWidthMinPixels: 2,
          //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
          //   getFillColor: f => COLOR_SCALE(f.properties.growth),
          //   getElevation: 2,
          getLineWidth: 1,
          lineWidthUnits: "meters",

          getFillColor: (f) => getFillColor(f),
          getLineColor: (f) => getLineColor(f),
          //   lineWidthUnits: "common",

          pickable: true,
          autoHighlight: true,
          highlightColor: [0, 0, 128, 128],

          updateTriggers: {
            getLineColor: [isBuilding],
            getFillColor: [isBuilding],
          },
        }),
        ...GetWalkCircle(
          _BUILDINGS[buildingID].coord[0],
          _BUILDINGS[buildingID].coord[1]
        ),
      ]);

      setViewState({
        longitude: _BUILDINGS[buildingID].coord[0],
        latitude: _BUILDINGS[buildingID].coord[1],
        zoom: 15,
        pitch: 0,
        bearing: 0,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    } else {
      setViewState(INITIAL_VIEW_STATE);
      setLayers(basicLayers);
    }
  }, [isBuilding]);

  return (
    <DeckGL
      layers={layers}
      effects={effects}
      initialViewState={viewState}
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

import React, { useState, useEffect } from "react";

import Map from "react-map-gl";

import mapboxgl from "mapbox-gl";

import DeckGL from "@deck.gl/react";
import { FlyToInterpolator } from "@deck.gl/core";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";
import { DataFilterExtension } from "@deck.gl/extensions";

import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";
// import { scaleThreshold } from "d3-scale";

// import floor_data from "../data/map/bld_floors.json";
import floor_data from "../../data/map/processed_bld_floors_small.json";
import CAT_COLOR from "../../data/color/categorical_color_palette.json";
import _BUILDINGS from "../../data/sandbox/explorable_building_simple.json";

import GetCircle from "./GetCircle";
import GetWalkCircle from "./GetWalkCircle";

import { stateStore } from "../../stores";

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
  bearing: -36,
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
  const { simple_sandbox_slider_value_1, simple_sandbox_slider_value_2 } =
    stateStore;

  let _BUILDING_A = ["658-4"];
  let _BUILDING_B = ["591-21"];
  //   let current_h_A = 13;
  //   let current_h_B = 17;
  let current_h_A = 0;
  let current_h_B = 0;

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

  let getLineColor = (data) => {
    if (data.properties.ind.toString().indexOf("658-4") == 0) {
      let dao_line =
        current_h_A + Math.ceil(0.3 * simple_sandbox_slider_value_1);
      let dev_line = current_h_A;
      if (data.properties.floor > dao_line) return [234, 76, 111];
      if (data.properties.floor > dev_line) return [36, 83, 255];
      return [0, 0, 0];
    }
    if (data.properties.ind.toString().indexOf("591-21") == 0) {
      let dao_line =
        current_h_B + Math.ceil(0.3 * simple_sandbox_slider_value_2);
      let dev_line = current_h_B;
      if (data.properties.floor > dao_line) return [234, 76, 111];
      if (data.properties.floor > dev_line) return [36, 83, 255];
      return [0, 0, 0];
    }
    return [0, 0, 0];
  };

  let getFillColor = (data) => {
    if (data.properties.ind.toString().indexOf("658-4") == 0) {
      let dao_line =
        current_h_A + Math.ceil(0.3 * simple_sandbox_slider_value_1);
      let dev_line = current_h_A;
      if (data.properties.floor > dao_line) return [234, 76, 111, 0.5 * 255];
      if (data.properties.floor > dev_line) return [36, 83, 255, 0.5 * 255];
      return [255, 255, 255];
    }
    if (data.properties.ind.toString().indexOf("591-21") == 0) {
      let dao_line =
        current_h_B + Math.ceil(0.3 * simple_sandbox_slider_value_2);
      let dev_line = current_h_B;
      if (data.properties.floor > dao_line) return [234, 76, 111, 0.5 * 255];
      if (data.properties.floor > dev_line) return [36, 83, 255, 0.5 * 255];
      return [255, 255, 255];
    }
    // grey
    if (true) return [128, 128, 128];

    let _color_id = data.properties.type.toString();
    let _hex_color = CAT_COLOR[_color_id];
    return _hex_color.slice(1, 7).convertToRGB();
  };

  let getPickable = (data) => {
    return false;
  };

  let getAutoHighlight = (data) => {
    return false;
  };

  let filterCheck = (data) => {
    if (_BUILDING_A.includes(data.properties.bld)) {
      if (data.properties.floor > current_h_A + simple_sandbox_slider_value_1)
        return 0;
    }
    if (_BUILDING_B.includes(data.properties.bld)) {
      if (data.properties.floor > current_h_B + simple_sandbox_slider_value_2)
        return 0;
    }
    return 1;
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
      material: false,
      opacity: 0.8,
      //   extruded: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 2,
      //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      //   getFillColor: f => COLOR_SCALE(f.properties.growth),
      //   getElevation: 2,
      getLineWidth: 1,
      lineWidthUnits: "meters",

      pickable: true,
      autoHighlight: true,
      getFillColor: (f) => getFillColor(f),
      getLineColor: (f) => getLineColor(f),
      //   lineWidthUnits: "common",

      getFilterValue: (f) => filterCheck(f),
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],

      highlightColor: [0, 0, 128, 128],

      updateTriggers: {
        getLineColor: [
          isBuilding,
          simple_sandbox_slider_value_1,
          simple_sandbox_slider_value_2,
        ],
        getFillColor: [
          isBuilding,
          simple_sandbox_slider_value_1,
          simple_sandbox_slider_value_2,
        ],
        getFilterValue: [
          simple_sandbox_slider_value_1,
          simple_sandbox_slider_value_2,
        ],
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

  useEffect(() => {
    // console.log(simple_sandbox_slider_value_1);

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
        material: false,
        opacity: 0.8,
        //   extruded: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 2,
        //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
        //   getFillColor: f => COLOR_SCALE(f.properties.growth),
        //   getElevation: 2,
        getLineWidth: 1,
        lineWidthUnits: "meters",

        pickable: true,
        autoHighlight: true,
        getFillColor: (f) => getFillColor(f),
        getLineColor: (f) => getLineColor(f),
        //   lineWidthUnits: "common",

        getFilterValue: (f) => filterCheck(f),
        filterRange: [1, 1],
        extensions: [new DataFilterExtension({ filterSize: 1 })],

        highlightColor: [0, 0, 128, 128],

        updateTriggers: {
          getLineColor: [
            isBuilding,
            simple_sandbox_slider_value_1,
            simple_sandbox_slider_value_2,
          ],
          getFillColor: [
            isBuilding,
            simple_sandbox_slider_value_1,
            simple_sandbox_slider_value_2,
          ],
          getFilterValue: [
            simple_sandbox_slider_value_1,
            simple_sandbox_slider_value_2,
          ],
        },
      }),
    ]);
  }, [simple_sandbox_slider_value_1, simple_sandbox_slider_value_2]);

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

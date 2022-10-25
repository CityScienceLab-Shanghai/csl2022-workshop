import * as turf from "@turf/turf";
import GetCircle from "./GetCircle";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";

const GetWalkCircle = (lon, lat) => {
  let layers = [];
  layers.push(
    new GeoJsonLayer({
      id: "geojson",
      data: GetCircle(lon, lat, 0.25),
      pickable: false,
      stroked: true,
      wireframe: true,
      lineWidthMinPixels: 3,
      getLineWidth: 1,
      lineWidthUnits: "meters",
      getFillColor: (f) => [255, 255, 0, 50],
      getLineColor: (f) => [255, 255, 0, 90],
    }),
    new GeoJsonLayer({
      id: "geojson",
      data: GetCircle(lon, lat, 0.5),
      pickable: false,
      stroked: true,
      wireframe: true,
      lineWidthMinPixels: 3,
      getLineWidth: 1,
      lineWidthUnits: "meters",
      getFillColor: (f) => [255, 255, 0, 30],
      getLineColor: (f) => [255, 255, 0, 70],
    }),
    new GeoJsonLayer({
      id: "geojson",
      data: GetCircle(lon, lat, 0.75),
      pickable: false,
      stroked: true,
      wireframe: true,
      lineWidthMinPixels: 3,
      getLineWidth: 1,
      lineWidthUnits: "meters",
      getFillColor: (f) => [255, 255, 0, 10],
      getLineColor: (f) => [255, 255, 0, 50],
    })
  );
  return layers;
};

export default GetWalkCircle;

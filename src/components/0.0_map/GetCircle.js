import * as turf from "@turf/turf";

const GetCircle = (lon, lat, radius = 0.75) => {
  let _center = turf.point([lon, lat]);
  let _radius = radius;
  let _options = {
    steps: 80,
    units: "kilometers", // or "mile"
  };

  let _circle = turf.circle(_center, _radius, _options);

  return _circle;
};

export default GetCircle;

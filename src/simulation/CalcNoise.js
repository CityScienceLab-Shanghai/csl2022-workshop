import _LOOKUP from "../data/sim/amen_lookup.json";
import _AMEN_DATA from "../data/sandbox/amenities.json";

const getNoise = (count) => {
  let _NORMALIZE = true;
  let score = 0;
  let amount = 0;

  Object.keys(count).forEach(function (key) {
    amount += count[key];
    score += _AMEN_DATA[_LOOKUP[key]]["noise"] * count[key];
  });

  // avg
  score = score / amount;
  if (_NORMALIZE) score = ((3 - score) / 3) * 100;

  return score;
};

const CalcNoise = (countObj) => {
  let weight5min = 20;
  let weight10min = 10;
  let weight15min = 5;

  let score =
    (getNoise(countObj["5min_count"]) * weight5min +
      getNoise(countObj["10min_count"]) * weight10min +
      getNoise(countObj["15min_count"]) * weight15min) /
    (weight5min + weight10min + weight15min);

//   console.log(score);
  return score;
};

export default CalcNoise;

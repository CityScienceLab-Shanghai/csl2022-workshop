import CalcNoise from "./CalcNoise";

const GetUrbanPerformance = (count) => {
  let score = 0;
  let amount = 0;
  Object.keys(count).forEach(function (key) {
    amount += count[key];
    score += _AMEN_DATA[_LOOKUP[key]] * count[key];
  });

  // avg
  score = score / amount;
  if (_NORMALIZE) score = ((3 - score) / 3) * 100;

  return score;
};

export default GetUrbanPerformance;

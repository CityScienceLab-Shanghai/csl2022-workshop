import resso from "resso";

import _INIT_BAR_DATA from "../data/charts/bar_chart.json";
import _INIT_RADAR_DATA from "../data/charts/radar_chart.json";
import _INIT_RADAR_DATA_SIMPLE from "../data/charts/radar_chart _simple.json";
import _INIT_BLD from "../data/map/processed_metric_init.json";
import _AMENITIES_DATA from "../data/sandbox/amenities.json";

import CalcNoise from "../simulation/CalcNoise";

const getSelected = () => {
  let selected_status = {};
  for (var i = 0; i < 24; i++) selected_status[_AMENITIES_DATA[i].id] = false;
  return selected_status;
};

const getBarCharts = (stateStore) => {
  let bar_init = {};

  let tutorial_keys = ["t22", "t24", "t42", "t44"];
  let sandbox_keys = ["ks"];
  let tracked_list = [...tutorial_keys, ...sandbox_keys];
  //   console.log(tracked_list);

  for (let i = 0; i < tracked_list.length; ++i) {
    // deepcopy
    bar_init[tracked_list[i]] = JSON.parse(JSON.stringify(_INIT_BAR_DATA));
  }

  //   console.log(bar_init);
  return bar_init;
};

const getRadarCharts = (stateStore) => {
  let radar_init = {};

  let tutorial_keys = ["t22", "t24", "t42", "t44"];
  let sandbox_keys = ["ks", ...Object.keys(_INIT_BLD)];

  let tracked_list = [...sandbox_keys];
  //   let tracked_list = [...tutorial_keys, ...sandbox_keys];
  //   console.log(tracked_list);

  radar_init["t22"] = JSON.parse(JSON.stringify(_INIT_RADAR_DATA_SIMPLE));
  radar_init["t24"] = JSON.parse(JSON.stringify(_INIT_RADAR_DATA_SIMPLE));
  radar_init["t42"] = JSON.parse(JSON.stringify(_INIT_RADAR_DATA_SIMPLE));
  radar_init["t44"] = JSON.parse(JSON.stringify(_INIT_RADAR_DATA_SIMPLE));

  let amenCount = getAmenCount();
  for (let i = 0; i < tracked_list.length; ++i) {
    // deepcopy
    radar_init[tracked_list[i]] = JSON.parse(
      JSON.stringify(_INIT_RADAR_DATA_SIMPLE)
    );
    radar_init[tracked_list[i]][0]["Baseline"] = CalcNoise(
      amenCount[tracked_list[i]]
    );
    radar_init[tracked_list[i]][1]["Baseline"] = CalcNoise(
      amenCount[tracked_list[i]]
    );
    radar_init[tracked_list[i]][2]["Baseline"] = CalcNoise(
      amenCount[tracked_list[i]]
    );
    radar_init[tracked_list[i]][3]["Baseline"] = CalcNoise(
      amenCount[tracked_list[i]]
    );
    radar_init[tracked_list[i]][4]["Baseline"] = CalcNoise(
      amenCount[tracked_list[i]]
    );

    for (let j = 0; j < 5; ++j)
      radar_init[tracked_list[i]][j]["Proposal"] =
        radar_init[tracked_list[i]][j]["Baseline"];
  }

  //   console.log(radar_init);
  return radar_init;
};

const getAmenCount = () => {
  let amen_count_init = {};

  let tutorial_keys = ["t22", "t24", "t42", "t44"];
  let sandbox_keys = ["ks"];
  let tracked_list = Object.keys(_INIT_BLD);

  // customize for special count
  amen_count_init["t22"] = { ..._INIT_BLD[tracked_list[0]] };
  amen_count_init["t24"] = { ..._INIT_BLD[tracked_list[0]] };
  amen_count_init["t42"] = { ..._INIT_BLD[tracked_list[0]] };
  amen_count_init["t44"] = { ..._INIT_BLD[tracked_list[0]] };
  amen_count_init["ks"] = { ..._INIT_BLD[tracked_list[0]] };

  for (let i = 0; i < tracked_list.length; ++i) {
    // deepcopy
    amen_count_init[tracked_list[i]] = JSON.parse(
      JSON.stringify(_INIT_BLD[tracked_list[i]])
    );
  }

  //   console.log(amen_count_init);
  return amen_count_init;
};

export const stateStore = resso({
  page: 1,
  maxPage: 1,
  nextPage: () => {
    stateStore.page++;
    if (stateStore.page > stateStore.maxPage)
      stateStore.maxPage = stateStore.page;
  },
  prevPage: () => stateStore.page--,
  setPage: (pageIndex) => {
    stateStore.page = pageIndex;
    if (stateStore.page > stateStore.maxPage)
      stateStore.maxPage = stateStore.page;
  },
  amenCount: getAmenCount(),
  barCharts: getBarCharts(),
  radarCharts: getRadarCharts(),
  setBarCharts: (key, value) => {
    let newObj = stateStore.barCharts;
    newObj[key] = value;
    stateStore.barCharts = JSON.parse(JSON.stringify(newObj));
  },
  setRadarCharts: (key, value) => {
    let newObj = stateStore.radarCharts;
    newObj[key] = value;
    stateStore.radarCharts = JSON.parse(JSON.stringify(newObj));
  },
  updateBarCharts: (key, type, value) => {
    let newObj = stateStore.barCharts;
    newObj[key][type]["value"] = value;
    stateStore.barCharts = JSON.parse(JSON.stringify(newObj));
  },
  updateAmenCount: (key, range, type, variation) => {
    let newObj = stateStore.amenCount;
    newObj[key][range][type] += variation;
    stateStore.amenCount = JSON.parse(JSON.stringify(newObj));
    stateStore.refreshRadarChart(key);
  },
  refreshRadarChart: (key) => {
    let newObj = stateStore.radarCharts;

    newObj[key][0]["Proposal"] = CalcNoise(stateStore.amenCount[key]);
    newObj[key][1]["Proposal"] = CalcNoise(stateStore.amenCount[key]);
    newObj[key][2]["Proposal"] = CalcNoise(stateStore.amenCount[key]);
    newObj[key][3]["Proposal"] = CalcNoise(stateStore.amenCount[key]);
    newObj[key][4]["Proposal"] = CalcNoise(stateStore.amenCount[key]);
    newObj[key][5]["Proposal"] = CalcNoise(stateStore.amenCount[key]);

    stateStore.radarCharts = JSON.parse(JSON.stringify(newObj));
  },
  simple_sandbox_slider_value_1: 5,
  simple_sandbox_slider_value_2: 5,
  set_simple_sandbox_slider_value_1: (value) => {
    stateStore.simple_sandbox_slider_value_1 = value;
  },
  set_simple_sandbox_slider_value_2: (value) => {
    stateStore.simple_sandbox_slider_value_2 = value;
  },
  selected: getSelected(),
  setSelected: (value) => {
    stateStore.selected = value;
  },
  updateSelected: (index, value) => {
    let newObj = stateStore.selected;
    newObj[index] = !newObj[index];
    stateStore.selected = JSON.parse(JSON.stringify(newObj));
  },
  countSelected: 0,
  setCountSelected: (value) => {
    stateStore.countSelected = value;
  },
});

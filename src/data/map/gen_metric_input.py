import ipdb
import json
from tqdm import tqdm
import math
import copy

height = 20

with open("processed_building_centers.json", "rb") as f:
    load_json = json.load(f)

radius5 = 1.141255544679108e-5 * 250
radius10 = 1.141255544679108e-5 * 500
radius15 = 1.141255544679108e-5 * 750

# amenities color
amen_type_mapping = {
    "Public Open Space": 1,
    "Higher Education": 2,
    "Education Residential": 26,
    "Education": 2,
    "Residential": 26,
    "Utility": 5,
    "Mixed Use Residential": 26,
    "Commercial": 9,
    "Office": 12,
    "Vacant Residential": 26,
    "Office/R&D": 12,
    "Transportation": 5,
    "Charitable/Religious": 16,
    "Assisted Living/Boarding House": 26,
    "Privately-Owned Open Space": 26,
    "Health": 15,
    "Mixed Use Commercial": 9,
    "Government Operations": 5,
    "Industrial": 25,
    "Vacant Commercial": 9,
    "Mixed Use Education": 2,
}

output = {}
explorable_building_list = ["624-4", "710-9"]

# for i in tqdm(range(len(load_json["features"]))):
#     load_json["features"][i]["properties"]["type"] = amen_type_mapping[
#         load_json["features"][i]["properties"]["Category"]
#     ]

_COUNT = {
    "public open space": 0,
    "Education": 0,
    "Utility": 0,
    "Commercial": 0,
    "Office/R&D": 0,
    "Health": 0,
    "religious": 0,
    "Industry": 0,
    "Residential": 0,
}

_LOOK_UP = {
    1: "public open space",
    2: "Education",
    5: "Utility",
    9: "Commercial",
    12: "Office/R&D",
    15: "Health",
    16: "religious",
    25: "Industry",
    26: "Residential",
}

# compress floor
for id in explorable_building_list:
    output[id] = {
        "id": id,
        "5min_count": copy.deepcopy(_COUNT),
        "10min_count": copy.deepcopy(_COUNT),
        "15min_count": copy.deepcopy(_COUNT),
    }

    for k, v in tqdm(load_json.items()):
        distance = math.sqrt(
            (v["center"][0] - load_json[id]["center"][0]) ** 2
            + (v["center"][1] - load_json[id]["center"][1]) ** 2
        )
        if distance < radius5:
            output[id]["5min_count"][_LOOK_UP[v["type"]]] += 1
            continue
        
        if distance < radius10:
            output[id]["10min_count"][_LOOK_UP[v["type"]]] += 1
            continue
        
        if distance < radius15:
            output[id]["15min_count"][_LOOK_UP[v["type"]]] += 1
            continue

        # if load_json["features"][i]["properties"]["floor"] != 1:
        #     continue
        # x = 0
        # y = 0
        # for j in range(len(load_json["features"][i]["geometry"]["coordinates"][0])):
        #     # ipdb.set_trace()
        #     x += load_json["features"][i]["geometry"]["coordinates"][0][j][0]
        #     y += load_json["features"][i]["geometry"]["coordinates"][0][j][1]

        # x /= len(load_json["features"][i]["geometry"]["coordinates"][0])
        # y /= len(load_json["features"][i]["geometry"]["coordinates"][0])

        # ind = load_json["features"][i]["properties"]["ind"][:-2]
        # output[ind] = {
        #     "id": ind,
        #     "center": [x, y],
        #     "type": amen_type_mapping[load_json["features"][i]["properties"]["Category"]],
        # }
        continue

with open("processed_metric_init.json", "w") as f:
    json.dump(output, f)

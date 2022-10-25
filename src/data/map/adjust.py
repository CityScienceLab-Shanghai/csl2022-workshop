import ipdb
import json
from tqdm import tqdm

height = 20

with open("init_bld_floors.json", "rb") as f:
    load_json = json.load(f)


# adjust floor shift
for i in tqdm(range(len(load_json["features"]))):
    for j in range(len(load_json["features"][i]["geometry"]["coordinates"][0])):
        # ipdb.set_trace()
        load_json["features"][i]["geometry"]["coordinates"][0][j][2] = load_json[
            "features"
        ][i]["geometry"]["coordinates"][0][0][2]


# adjust height shift
for i in tqdm(range(len(load_json["features"]))):
    for j in range(len(load_json["features"][i]["geometry"]["coordinates"][0])):
        # ipdb.set_trace()
        load_json["features"][i]["geometry"]["coordinates"][0][j][2] += height

# amenities color
color_mapping = {
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

for i in tqdm(range(len(load_json["features"]))):
    load_json["features"][i]["properties"]["type"] = color_mapping[
        load_json["features"][i]["properties"]["Category"]
    ]


with open("processed_bld_floors.json", "w") as f:
    json.dump(load_json, f)

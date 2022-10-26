import ipdb
import json
from tqdm import tqdm
import math

height = 20

with open("processed_bld_floors.json", "rb") as f:
    load_json = json.load(f)

with open("processed_building_centers.json", "rb") as f:
    center_json = json.load(f)


d = 1.141255544679108e-5 * 900
smaller_map_keys = []
for k, v in tqdm(center_json.items()):
    # ipdb.set_trace()
    distance = math.sqrt(
        (v["center"][0] - center_json["672-5"]["center"][0]) ** 2
        + (v["center"][1] - center_json["672-5"]["center"][1]) ** 2
    )
    if distance < d:
        smaller_map_keys.append(k)


print(smaller_map_keys)

output = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
}


# filter from large map
for i in tqdm(range(len(load_json["features"]))):
    if (load_json["features"][i]["properties"]["bld"] == "528-12"):
        print("Catch")
        continue
    
    if (load_json["features"][i]["properties"]["bld"] in smaller_map_keys):
        output["features"].append(load_json["features"][i])



with open("processed_bld_floors_small.json", "w") as f:
    json.dump(output, f)

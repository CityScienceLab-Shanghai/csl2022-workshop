import ipdb
import json
from tqdm import tqdm

height = 20

with open("init_bld_floors.json", "rb") as f:
    load_json = json.load(f)

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

placeholder_gen = (
    {
        "type": "Feature",
        "properties": {
            "ind": "620-2_3",
            "floor": 3,
            "Category": "Office",
            "bld": "620-2",
            "area": 31816.786928437621,
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-71.080952872016169, 42.364095769094611, 37.69536348267463],
                    [-71.081061098854349, 42.36386952576423, 48.767703604205252],
                    [-71.0811878685316, 42.36388522138752, 48.767598933836702],
                    [-71.081259893995977, 42.363576004224775, 29.509223371219495],
                    [-71.081763007775692, 42.36368661553751, 22.096972835157118],
                    [-71.081773815766894, 42.363689015409051, 21.937678493476891],
                    [-71.081655917949178, 42.364193009051888, 25.889705571769642],
                    [-71.080949297054815, 42.364103243764433, 37.329387077964611],
                    [-71.080950664761104, 42.364100382230745, 37.469584576184928],
                    [-71.080952872016169, 42.364095769094611, 37.69536348267463],
                ]
            ],
        },
    },
)

output = {}

# for i in tqdm(range(len(load_json["features"]))):
#     load_json["features"][i]["properties"]["type"] = amen_type_mapping[
#         load_json["features"][i]["properties"]["Category"]
#     ]

# compress floor
for i in tqdm(range(len(load_json["features"]))):
    if load_json["features"][i]["properties"]["floor"] != 1:
        continue
    x = 0
    y = 0
    for j in range(len(load_json["features"][i]["geometry"]["coordinates"][0])):
        # ipdb.set_trace()
        x += load_json["features"][i]["geometry"]["coordinates"][0][j][0]
        y += load_json["features"][i]["geometry"]["coordinates"][0][j][1]

    x /= len(load_json["features"][i]["geometry"]["coordinates"][0])
    y /= len(load_json["features"][i]["geometry"]["coordinates"][0])

    ind = load_json["features"][i]["properties"]["ind"][:-2]
    output[ind] = {
        "id": ind,
        "center": [x, y],
        "type": amen_type_mapping[load_json["features"][i]["properties"]["Category"]],
    }

with open("processed_building_centers.json", "w") as f:
    json.dump(output, f)

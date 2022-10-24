import ipdb
import json
from tqdm import tqdm

height = 20

with open('init_bld_floors.json', 'rb') as f:
    load_json = json.load(f)


# adjust floor shift       
for i in tqdm(range(len(load_json['features']))):
    for j in range(len(load_json['features'][i]['geometry']['coordinates'][0])):
        # ipdb.set_trace()
        load_json['features'][i]['geometry']['coordinates'][0][j][2] = load_json['features'][i]['geometry']['coordinates'][0][0][2]
    

# adjust height shift     
for i in tqdm(range(len(load_json['features']))):
    for j in range(len(load_json['features'][i]['geometry']['coordinates'][0])):
        # ipdb.set_trace()
        load_json['features'][i]['geometry']['coordinates'][0][j][2] += height
    
with open('processed_bld_floors.json', 'w') as f:
    json.dump(load_json, f)
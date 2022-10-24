from enum import unique
import ipdb
import json
from tqdm import tqdm

amen = []

with open('./init_bld_floors.json', 'rb') as f:
    load_json = json.load(f)
   
for i in tqdm(range(len(load_json['features']))):
    if (not load_json['features'][i]['properties']['Category'] in amen):
        amen.append(load_json['features'][i]['properties']['Category'])
    
print(((amen)))
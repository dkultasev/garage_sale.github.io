
import json

def convert_json_to_js(json_file, js_file):
    with open(json_file, 'r') as infile:
        data = json.load(infile)
    js_data = f"var productsData = {json.dumps(data)};"
    with open(js_file, 'w') as outfile:
        outfile.write(js_data)


convert_json_to_js('products.json', 'products.js')

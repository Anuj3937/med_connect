# app.py (in server/)
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Use the merged CSV with images
csv_path = os.path.join(os.path.dirname(__file__), 'data', 'indian_medicine_data_with_images.csv')
df = pd.read_csv(csv_path)

@app.route('/api/medicines', methods=['GET'])
def get_medicines():
    query = request.args.get('q', '')
    if query:
        filtered = df[df['name'].str.contains(query, case=False, na=False)]
    else:
        filtered = df
    # Replace NaN with empty string
    filtered = filtered.fillna('')
    result = filtered.head(100)[['name', 'price(₹)', 'manufacturer_name', 'type', 'pack_size_label', 'short_composition1', 'image_url']].to_dict(orient='records')
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
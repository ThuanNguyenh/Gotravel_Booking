from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# API endpoints
TOUR_API = 'https://6645c30ab8925626f89310d5.mockapi.io/api/v1/tour'
RATINGS_API = 'https://6645c30ab8925626f89310d5.mockapi.io/api/v1/rating'

# Function to get data from API
def fetch_data(api_url):
    response = requests.get(api_url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return pd.DataFrame(response.json())

# Fetch tours and ratings data from the API
tour_df = fetch_data(TOUR_API)
ratings_df = fetch_data(RATINGS_API)

# Ensure 'tourId' columns are of the same type (string)
tour_df['tourId'] = tour_df['tourId'].astype(str)
ratings_df['tourId'] = ratings_df['tourId'].astype(str)

# Convert categories to pipe-separated string format
tour_df['categories'] = tour_df['categories'].apply(lambda x: '|'.join(x))

# Convert rating to a decimal format
ratings_df['rating'] = ratings_df['rating'] / 10.0

# Merge the dataframes on 'tourId'
df = tour_df.merge(ratings_df, on='tourId')
print(df)

@app.route('/', methods=['GET'])
def test():
    return jsonify({"message": "Hello from the backend!"})

@app.route('/api/recommend', methods=['GET'])
def recommend():
    # Get tourName from query parameters
    tour_name = request.args.get('tourName')
    
    if not tour_name:
        tour_name = 'tourName 5'
    
    recommended_tours = []

    tour_db = df[df['tourName'] == tour_name].sort_values(by='rating', ascending=False)
    print(tour_db)

    for user in tour_db.iloc[:5]['userId'].values:
        rated_tours = df[df['userId'] == user]
        rated_tours = rated_tours[rated_tours['tourName'] != tour_name].sort_values(by='rating', ascending=False).iloc[:5]
        recommended_tours.extend(list(rated_tours['tourName'].values))
        
    recommended_tours = np.unique(recommended_tours)

    gtour_categories = df[df['tourName'] == tour_name].iloc[0]['categories'].split('|')
    scores = {}

    for tour in recommended_tours:
        toured = df[df['tourName'] == tour].iloc[0]
        tour_categories = toured['categories'].split('|')
        score = 0
        
        for gtour_category in gtour_categories:
            if gtour_category in tour_categories:
                score += 1
        
        scores[tour] = score
        
    recommended_tours = sorted(scores, key=lambda x: scores[x], reverse=True)

    return jsonify({"recommendations": recommended_tours})

@app.route('/api/hint', methods=['GET'])
def hint():
    # Get input characters from query parameters
    query = request.args.get('input')

    if not query:
        return jsonify({"error": "Input parameter is required."}), 400

    # Filter tour names based on input characters
    filtered_tours = tour_df[tour_df['tourName'].str.contains(query, case=False)]

    # Extract unique tour names from the filtered list
    suggestions = filtered_tours['tourName'].unique().tolist()

    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS

import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

movies_df = pd.read_csv('data/movies.csv')
ratings_df = pd.read_csv('data/ratings.csv')

df = movies_df.merge(ratings_df, on='movieId')

@app.route('/', methods=['GET'])
def test():
    return jsonify({"message": "Hello from the backend!"})


@app.route('/api/recommend', methods=['GET'])
def recommend():
    # Get Film_Name from query parameters
    film_name = request.args.get('filmName')
    
    if not film_name:
        # return jsonify({"error": "Film_Name parameter is required."}), 400
        # Default film name
        film_name = 'Pacific Rim (2013)'
    
    recommended_movies = []

    movie_db = df[df['title'] == film_name].sort_values(by='rating', ascending=False)

    for user in movie_db.iloc[:5]['userId'].values:
        rated_movies = df[df['userId'] == user]
        rated_movies = rated_movies[rated_movies['title'] != film_name].sort_values(by='rating', ascending=False).iloc[:5]
        recommended_movies.extend(list(rated_movies['title'].values))
        
    recommended_movies = np.unique(recommended_movies)

    gmovie_genres = df[df['title'] == film_name].iloc[0]['genres'].split('|')
    scores = {}

    for movie in recommended_movies:
        movied = df[df['title'] == movie].iloc[0]
        movie_genres = movied['genres'].split('|')
        score = 0
        
        for gmovie_genre in gmovie_genres:
            if gmovie_genre in movie_genres:
                score += 1
        
        scores[movie] = score
        
    recommended_movies = sorted(scores, key=lambda x: scores[x])[::-1]

    return jsonify({"recommendations": recommended_movies})


@app.route('/api/hint', methods=['GET'])
def hint():
    # Get input characters from query parameters
    query = request.args.get('input')

    if not query:
        return jsonify({"error": "Input para    meter is required."}), 400

    # Filter movie titles based on input characters
    filtered_movies = movies_df[movies_df['title'].str.contains(query, case=False)]

    # Extract unique movie titles from the filtered list
    suggestions = filtered_movies['title'].unique().tolist()

    return jsonify({"suggestions": suggestions})


if __name__ == '__main__':
    app.run(debug=True)

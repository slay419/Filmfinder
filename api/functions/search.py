import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re
import hashlib

from functions.review import getUserReviewList
from functions.admin import getCastIdByName


def searchGenre(genre):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        select m.movie_id, director_id, adult, title, release_date, runtime, budget, 
        revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count
        from genre g join movie m on g.movie_id = m.movie_id
        where g.genre like "{genre}" and vote_count > 50
        group by m.movie_id
        order by vote_avg desc, vote_count desc
        limit 600;
        """
    )
    index = 0
    movies = {}
    for movie in cur.fetchall():
        item = extractMovieDetails(movie)
        movies[index] = item
        index += 1

    conn.close()

    return {"movies": movies}


def searchKeyword(keyword):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        select m.movie_id, director_id, adult, title, release_date, runtime, budget, 
        revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count
        from keyword k join movie m on k.movie_id = m.movie_id
        where k.keyword like "{keyword}" and vote_count > 50
        group by m.movie_id
        order by vote_avg desc, vote_count desc
        limit 600;
        """
    )
    index = 0
    movies = {}
    for movie in cur.fetchall():
        item = extractMovieDetails(movie)
        movies[index] = item
        index += 1

    conn.close()
    return {"movies": movies}


def searchDirector(director_name):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        select m.movie_id, director_id, adult, title, release_date, runtime, budget, 
        revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count
        from cast c join movie m on cast_id = director_id
        where cast_name like "%{director_name}%"
        group by m.movie_id
        order by release_date desc
        limit 600;
        """
    )
    index = 0
    movies = {}
    for movie in cur.fetchall():
        item = extractMovieDetails(movie)
        movies[index] = item
        index += 1

    conn.close()
    return {"movies": movies}

def searchMoviesByActor(cast_name):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cast_id = getCastIdByName(cast_name)
    cur.execute(
        f"""
        select m.movie_id, director_id, adult, title, release_date, runtime, 
            budget, revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count
        from movie m join acting a on m.movie_id = a.movie_id
        where a.actor_id = {cast_id}
        order by release_date desc, vote_count desc;
        """
    )
    index = 0
    movies = {}
    for movie in cur.fetchall():
        item = extractMovieDetails(movie)
        movies[index] = item
        index += 1

    conn.close()
    return {"movies": movies}


def getDirectorById(director_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select cast_name from cast where cast_id = {director_id};")
    director_name = cur.fetchone()[0]
    conn.close()
    return director_name


def getGenreList(movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select genre from GENRE where movie_id = {movie_id};")
    genres = []
    for genre in cur.fetchall():
        genres.append(genre[0])
    conn.close()
    return genres


def getCastList(movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        select c.cast_name
        from cast c join acting a on c.cast_id = a.actor_id
        where a.movie_id = {movie_id};
        """
    )
    cast_list = []
    for cast in cur.fetchall():
        cast_list.append(cast[0])
    conn.close()
    return cast_list


# Extracts the default movie details from the movies table in sqlite
def extractMovieDetails(movie):
    item = {}
    item["movie_id"] = movie[0]
    item["director_id"] = movie[1]
    item["adult"] = movie[2]
    item["title"] = movie[3]
    item["release_date"] = movie[4]
    item["runtime"] = movie[5]
    item["budget"] = movie[6]
    item["revenue"] = movie[7]
    item["imdb_id"] = movie[8]
    item["language"] = movie[9]
    item["overview"] = movie[10]
    item["tagline"] = movie[11]
    item["poster"] = movie[12]
    item["vote_avg"] = movie[13]
    item["vote_count"] = movie[14]
    item["genres"] = getGenreList(item["movie_id"])
    return item


# Finds similar movies based on number of matching genres and keywords
def searchSimilarMovies(movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()

    # First query for the list of movies that share at least ONE matching genre
    cur.execute(
        f"""
        create temp view if not exists matchingGenres as
        select m.movie_id, title, genre
        from movie m join genre g on m.movie_id = g.movie_id
        where g.genre in (
            select genre from genre where movie_id = {movie_id}
        );
        """
    )

    # Next make query for list of movies that share at least ONE matching keyword
    cur.execute(
        f"""
        create temp view if not exists matchingKeywords as
        select m.movie_id, title, keyword
        from movie m join keyword k on m.movie_id = k.movie_id
        where k.keyword in (
            select keyword from keyword where movie_id = {movie_id}
        );
        """
    )

    # Combine both views and sort by num matching genres, keywords, and then average score
    cur.execute(
        f"""
        select m.movie_id, director_id, adult, m.title, release_date, runtime, budget, revenue, imdb_id, 
            movie_language, overview, tagline, poster, vote_avg, vote_count, 
            count(distinct(g.genre)) as num_matching_g, count(distinct(k.keyword)) as num_matching_k
        from matchingGenres g 
            join matchingKeywords k on g.movie_id = k.movie_id 
            join movie m on g.movie_id = m.movie_id
        where g.movie_id <> {movie_id}
        group by g.movie_id
        order by 
            num_matching_g desc,
            num_matching_k desc,
            vote_avg desc
        limit 10;
        """
    )
    index = 0
    movies = {}
    for movie in cur.fetchall():
        item = extractMovieDetails(movie)
        movies[index] = item
        index += 1

    cur.execute("drop view matchingGenres;")
    cur.execute("drop view matchingKeywords;")

    conn.close()

    return {"movies": movies}


# Finds similar movies based on all the movies the user has reviewed
def searchRecommendedMovies(user_id):
    conn = sqlite3.connect("./users.db")
    cur = conn.cursor()

    # Select all the movies that the user has left a good review on
    movie_id_list = []
    cur.execute(f"select movie_id from review where user_id = {user_id} and score > 6;")
    for row in cur.fetchall():
        movie_id_list.append(row[0])

    # Get list of all similar movies of each entry
    recommended_movies_list = []
    reviewed_movies_list = getUserReviewList(user_id)
    for movie_id in movie_id_list:
        similar_movie = searchSimilarMovies(movie_id)["movies"].values()
        for movie in similar_movie:
            recommended_id = movie['movie_id']
            if movie not in recommended_movies_list and recommended_id not in reviewed_movies_list:
                recommended_movies_list.append(movie)

    sorted_list = sorted(
        recommended_movies_list,
        key=lambda i: (i["vote_avg"], i["vote_count"]),
        reverse=True,
    )
    top_list = sorted_list[:6]
    #print(top_list)

    return {"movies": top_list}



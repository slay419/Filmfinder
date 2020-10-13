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
        limit 15;
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
        limit 15;
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
        limit 15;
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

import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re


# Add new movies to database 
# Format input
# director_id: integer
# adult: "True"/"False"
# title: text
# release_date: yyyy-mm-dd
# runtime: double (in minutes)
# budget: integer (in dollars)
# imdb_id: tt[0-9]{7}
# movie_language: [a-z]{2}
# overview: text
# tagline: text
# poster: url
# genres: list of genres e.g. ["Action", "Adventure"]
# cast: list of actor_ids e.g. [1, 2, 3]
def addNewMovie(director_id, adult, title, release_date, runtime, budget, 
    revenue, imdb_id, movie_language, overview, tagline, poster, genres, cast, keywords):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()

    # Select the biggest movie id and add 1 to ensure uniqueness
    cur.execute("select max(movie_id) from movie;")
    movie_id = cur.fetchone()[0] + 1
    print(f"movie_id is: {movie_id}")

    # Store movie details
    cur.execute(
        f"""
        insert into movie(movie_id, director_id, adult, title, release_date, runtime, budget, 
            revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count)
        values("{movie_id}", "{director_id}", "{adult}", "{title}", "{release_date}", "{runtime}", "{budget}", 
            "{revenue}", "{imdb_id}", "{movie_language}", "{overview}", "{tagline}", "{poster}", 0, 0)
        """
    )

    # Store genre list
    for genre in genres:
        cur.execute(f"insert into genre(movie_id, genre) values({movie_id}, '{genre}')")

    # Store actor list
    for actor_id in cast:
        cur.execute(f"insert into acting(actor_id, movie_id) values({actor_id}, {movie_id})")

    # Store keyword list
    for keyword in keywords:
        cur.execute(f"insert into keyword(movie_id, keyword) values({movie_id}, '{keyword}')")

    conn.commit()
    conn.close()
    return {"movie_id": movie_id}


# Remove movies from database
def removeExistingMovie(movie_id):
    if not isValidMovie(movie_id):
        return {"error": f"Movie with id {movie_id} does not exist in the database and cannot be removed"}

    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute(f"delete from movie where movie_id = {movie_id};")
    cur.execute(f"delete from genre where movie_id = {movie_id};")
    cur.execute(f"delete from acting where movie_id = {movie_id};")
    cur.execute(f"delete from keyword where movie_id = {movie_id};")
    conn.commit()
    conn.close()

    return {"success": "True"}

# Edit movies in database 


# Remove other users movie reviews

# Remove users from user database




def isValidMovie(movie_id):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select * from movie where movie_id = {movie_id};")
    matches = len(cur.fetchall())
    conn.close()
    if matches == 0:
        return False
    return True
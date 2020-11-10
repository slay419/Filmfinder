import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

from functions.review import deleteReview, userIdExists



def assignAdmin(user_id):

    if not userIdExists(user_id):
        return {"error": f"No user with id: {user_id} exists in the database"}
    elif checkAdmin(user_id)["isAdmin"] == "True":
        return {"error": f"User with id: {user_id} is already an admin"}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("select max(admin_id) from admins;")
    admin_id = cur.fetchone()[0] + 1

    # Add new admin to database
    cur.execute(f"insert into admins(user_id, admin_id) values({user_id}, {admin_id});")

    conn.commit()
    conn.close()

    return {"admin": admin_id}

def checkAdmin(user_id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select * from admins where user_id = {user_id}")
    matches = len(cur.fetchall())
    conn.close()
    if matches == 0:
        return {"isAdmin": "False"}
    return {"isAdmin": "True"}


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
def removeUserReview(review_id):
    return deleteReview(review_id)

# Remove users from user database 
# also removes all their previous reviews and removes them from any friend/banned lists
def removeUserById(user_id):
    if not userIdExists(user_id):
        return {"error": f"No user with id: {user_id} exists in the database"}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()

    # Remove all the reviews written by the user
    cur.execute(f"delete from review where user_id = {user_id};")

    # Clears their wishlist
    cur.execute(f"delete from wishlist where user_id = {user_id};")

    # Removes user from anyone's banned_list
    cur.execute(f"delete from banned_list where user_id = {user_id} or banned_id = {user_id};")

    # Removes user from anyone's friend_list
    cur.execute(f"delete from friend_list where user_id = {user_id} or friend_id = {user_id};")

    # Removes the user profile
    cur.execute(f"delete from users where user_id = {user_id};")

    conn.commit()
    conn.close()
    return {"success": "True"}


def isValidMovie(movie_id):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select * from movie where movie_id = {movie_id};")
    matches = len(cur.fetchall())
    conn.close()
    if matches == 0:
        return False
    return True
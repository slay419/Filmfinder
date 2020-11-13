import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

from functions.auth import remove_user_from_email_list
from functions.review import deleteReview, userIdExists



def assignAdmin(user_id):

    if not userIdExists(user_id):
        return {"error": f"No user with id: {user_id} exists in the database"}
    elif checkAdmin(user_id)["isAdmin"] == 1:
        return {"error": f"User with id: {user_id} is already an admin"}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("select max(admin_id) from admins;")

    admin_id = cur.fetchone()[0]
    if admin_id is None:
        admin_id = 1
    else:
        admin_id += 1

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
        return {"isAdmin": 0}
    return {"isAdmin": 1}


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
def addNewMovie(director_name, adult, title, release_date, overview, tagline, poster, genres, cast, keywords):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()

    # Select the biggest movie id and add 1 to ensure uniqueness
    cur.execute("select max(movie_id) from movie;")
    movie_id = cur.fetchone()[0] + 1
    print(f"movie_id is: {movie_id}")

    director_id = getCastIdByName(director_name)
    if director_id == -1:
        director_id = insertNewCastMember(director_name)
    # Store movie details
    cur.execute(
        f"""
        insert into movie(movie_id, director_id, adult, title, release_date, runtime, budget, 
            revenue, imdb_id, movie_language, overview, tagline, poster, vote_avg, vote_count)
        values("{movie_id}", "{director_id}", "{adult}", "{title}", "{release_date}", "0", "0", 
            "0", "0", "en", "{overview}", "{tagline}", "{poster}", 0, 0)
        """
    )

    # Store genre list
    for genre in genres:
        if genre is None or genre == "":
            continue
        cur.execute(f"insert into genre(movie_id, genre) values({movie_id}, '{genre}')")

    # Store actor list
    for actor_name in cast:
        print(actor_name)
        actor_id = getCastIdByName(actor_name)
        if actor_id == -1:
            actor_id = insertNewCastMember(actor_name)
        cur.execute(f"insert into acting(actor_id, movie_id) values({actor_id}, {movie_id})")

    # Store keyword list
    for keyword in keywords:
        cur.execute(f"insert into keyword(movie_id, keyword) values({movie_id}, '{keyword}')")

    conn.commit()
    conn.close()
    return {"movie_id": movie_id}

def editMovieCast(movie_id, director_name, cast_list):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    director_id = getCastIdByName(director_name)
    if director_id == -1:
        director_id = insertNewCastMember(director_name)
    cur.execute(f"update movie set director_id = '{director_id}' where movie_id = {movie_id}")

    # Delete old movie cast
    cur.execute(f"delete from acting where movie_id = {movie_id}")

    # Update with new cast list
    for cast_name in cast_list:
        print(cast_name)
        actor_id = getCastIdByName(cast_name)
        if actor_id == -1:
            actor_id = insertNewCastMember(cast_name)
        cur.execute(f"insert into acting(actor_id, movie_id) values({actor_id}, {movie_id})")

    conn.commit()
    conn.close()

    return {"movie_id": movie_id}

def editMovieGenres(movie_id, genre_list):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    
    # Delete old genres
    cur.execute(f"delete from genre where movie_id = {movie_id};")

    # Add new genres
    for genre in genre_list:
        if genre is None or genre == "":
            continue
        cur.execute(f"insert into genre(movie_id, genre) values({movie_id}, '{genre}');")
        
    conn.commit()
    conn.close()

    return {"movie_id": movie_id}


# Edit movies in database 
def editMovieDetails(movie_id, title, release_date, overview, tagline):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute(f"""UPDATE movie SET title = '{title}', release_date = '{release_date}', overview = '{overview}', tagline = '{tagline}' where movie_id = {movie_id}""")

    conn.commit()
    conn.close()

    return {"movie_id": movie_id}


# Stores a new cast into the database by generating a new cast id
def insertNewCastMember(cast_name):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute("select max(cast_id) from cast;")
    cast_id = cur.fetchone()[0] + 1
    cur.execute(f"insert into cast(cast_id, cast_name) values({cast_id}, '{cast_name}');")
    conn.commit()
    conn.close()    
    return cast_id


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

    # Clear data stored on email verification
    user_email = getEmailById(user_id)
    remove_user_from_email_list(user_email)

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

def getEmailById(user_id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select email from users where user_id = {user_id};")
    email = cur.fetchone()[0]
    conn.close()
    return email

# Given a case insensitive name - returns a corresponding id
def getCastIdByName(cast_name):
    conn = sqlite3.connect("movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select cast_id from cast where cast_name like '{cast_name}';")
    cast_id = cur.fetchone()
    conn.close()
    if cast_id is None:
        return -1
    return cast_id[0]

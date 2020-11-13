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
from functions.review import(
    userIdExists
)
from functions.search import (
    extractMovieDetails
)
from functions.friendList import (
    friendList_notify
)

# Add movie to wishlist
# Remove movie from wishlist
# Get wishlist from other user

# Wishlist db has separate row for every wishlist

def addWishlist(user_id, movie_id):
    # Check if user exists in the database
    # Sanity check because the user has to be logged in to add to wishlist
    if not userIdExists(user_id):
        return {"error": (f"No user with id: {user_id} exists in the database")}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        INSERT INTO wishlist(user_id, movie_id)
        VALUES ({user_id}, {movie_id})
        ;
        """
    )
    conn.commit()
    conn.close()
    friendList_notify(user_id, movie_id)
    return {"success": 1}

# Checks if the movie is in the user's wishlist
def checkWishlist(user_id, movie_id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM wishlist WHERE user_id = {user_id} AND movie_id = {movie_id}")
    if len(cur.fetchall()) == 0:
        conn.close()
        return False
    conn.close()
    return True

def getUserWishlist(user_id):
    movies = {}
    conn = sqlite3.connect("./users.db")
    conn.execute("ATTACH DATABASE 'movieDB.db' as movieDB")
    cur = conn.cursor()
    cur.execute(
        f"""SELECT * 
        FROM movieDB.movie
        WHERE movie_id IN (SELECT movie_id
            FROM wishlist 
            WHERE user_id={user_id})"""
    )
    for index, movie in enumerate(cur.fetchall()):
        item = extractMovieDetails(movie)
        movies[index] = item

    conn.close()
    return {"movies": movies, "number": len(movies)}


def removeFromWishlist(user_id, movie_id):
    conn = sqlite3.connect("./users.db")
    cur = conn.cursor()
    cur.execute(f"DELETE FROM wishlist WHERE user_id={user_id} AND movie_id={movie_id}")

    conn.commit()
    conn.close()
    return
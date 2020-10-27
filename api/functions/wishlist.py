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

# Add movie to wishlist
# Remove movie from wishlist
# Get wishlist from other user

# Wishlist db has separate row for every wishlist

def addWishlist(user_id, movie_id):
    # Check if user exists in the database
    # Sanity check because the user has to be logged in to add to wishlist
    if not userIdExists(user_id):
        raise ValueError(f"No user with id: {user_id} exists in the database")

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
    return True

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

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
import uuid

# Insert new value into users database
# CONSIDER: better way of getting the user_id from a token?
# How do we know the user_id from the request


def newReview(user_id, movie_id, comment, score):
    # check that the movie_id exists in the movie db
    if not movieIdExists(movie_id):
        return {"error": f"No movie with id: {movie_id} exists in the database"}

    # check that the user_id exists in the user db
    if not userIdExists(user_id):
        return {"error": f"No user with id: {user_id} exists in the database"}

    if score < 0:
        return {"error": "Score cannot be negative"}
    elif score > 10:
        return {"error": "Score cannot be greater than 10"}

    updateRating(score, movie_id) # This will update the average rating
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()

    cur.execute(f"""
        SELECT * FROM review order by review_id desc limit 1
    """)
    review_id = cur.fetchone()[0] + 1
    print("REVIEWID", review_id)

    cur.execute(
        f"""
        INSERT INTO review(review_id, user_id, movie_id, comment, score, num_likes)
        VALUES ({review_id}, {user_id}, {movie_id}, "{comment}", {score}, 0);
        """
    )
    conn.commit()
    conn.close()
    item = {}
    item['review_id'] = review_id
    item['comment'] = comment
    item['score'] = score
    item['num_likes'] = 0
    item['user_id'] = user_id
    return item


def editReview(review_id, comment, score):
    if not reviewIdExists(review_id):
        return {"error": f"No review with id: {review_id} exists in the database"}
    if score < 0:
        return {"error": "Score cannot be negative"}
    elif score > 10:
        return {"error": "Score cannot be greater than 10"}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(
        f'UPDATE review SET comment = "{comment}", score = {score} where review_id = {review_id};'
    )
    cur.execute(f'SELECT movie_id FROM review WHERE review_id={review_id}')
    movie_id = cur.fetchone()[0]
    updateRating(score, movie_id) # This will update the average rating
    conn.commit()
    conn.close()
    item = {}
    item['review_id'] = review_id
    item['comment'] = comment
    item['score'] = score
    return item


def deleteReview(review_id):
    if not reviewIdExists(review_id):
        return {"error": f"No review with id: {review_id} exists in the database"}

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()

    cur.execute(
        f'SELECT score, movie_id FROM review WHERE review_id={review_id}'
    )
    res = cur.fetchone()
    rating, movie_id = res[0], res[1]
    removeRating(rating, movie_id)

    cur.execute(
        f'DELETE FROM review WHERE review_id = "{review_id}";'
    )
    conn.commit()
    conn.close()
    return {"success": "True"}


# Increment the review num likes by 1
def incrementLikes(review_id):
    if not reviewIdExists(review_id):
        return {"error": f"No review with id: {review_id} exists in the database"}
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select * from review where review_id = {review_id};")
    num_likes = cur.fetchone()[5] + 1
    cur.execute(
        f"UPDATE review SET num_likes = {num_likes} where review_id = {review_id};"
    )
    conn.commit()
    conn.close()
    return {"success": "True"}


def movieIdExists(movie_id):
    movie_conn = sqlite3.connect("movieDB.db")
    movie_cur = movie_conn.cursor()
    movie_cur.execute(f"select * from movie where movie_id = {movie_id};")
    if len(movie_cur.fetchall()) == 0:
        movie_conn.close()
        return False
    movie_conn.close()
    return True


def userIdExists(user_id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select * from users where user_id = {user_id}")
    if len(cur.fetchall()) == 0:
        conn.close()
        return False
    conn.close()
    return True


def reviewIdExists(review_id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select * from review where review_id = {review_id}")
    if len(cur.fetchall()) == 0:
        conn.close()
        return False
    conn.close()
    return True

def getMovieReviewList(movie_id):
    if not movieIdExists(movie_id):
        return {"error": f"No movie with id: {movie_id} exists in the database"}
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select review_id, comment, score, num_likes, user_id from review where movie_id = {movie_id};")
    review_list = []
    for review in cur.fetchall():
        item = {}
        item['review_id'] = review[0]
        item['comment'] = review[1]
        item['score'] = review[2]
        item['num_likes'] = review[3]
        item['user_id'] = review[4]
        review_list.append(item)
    conn.close()
    return review_list

# Returns a list of movies a user has left a review on 
def getUserReviewList(user_id):
    if not userIdExists(user_id):
        return {"error": f"No user with id: {user_id} exists in the database"}
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(f"select movie_id from review where user_id = {user_id};")
    movie_list = []
    for movie in cur.fetchall():
        movie_list.append(movie[0])

    return movie_list

def updateRating(new_rating, movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"SELECT vote_count, vote_avg FROM movie WHERE movie_id={movie_id}")
    res = cur.fetchone()
    total_votes, avg = res[0], res[1]
    new_avg = (avg * total_votes + new_rating)/(total_votes + 1)

    cur.execute(
        f"""UPDATE movie 
        SET vote_count={total_votes+1}, vote_avg={round(new_avg, 1)} 
        WHERE movie_id={movie_id}"""
        )
    conn.commit()
    conn.close()

def removeRating(rating, movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"SELECT vote_count, vote_avg FROM movie WHERE movie_id={movie_id}")
    res = cur.fetchone()

    total_votes, avg = res[0], res[1]
    new_avg = (avg * total_votes - rating)/(total_votes - 1)

    cur.execute(
        f"""UPDATE movie 
        SET vote_count={total_votes-1}, vote_avg={round(new_avg, 1)} 
        WHERE movie_id={movie_id}"""
        )
    conn.commit()
    conn.close()

def getReviews(user_id):
    conn = sqlite3.connect("./users.db")
    conn.execute("ATTACH DATABASE 'movieDB.db' as movie")
    cur = conn.cursor()
    cur.execute(
        f'''SELECT review_id, comment, score, num_likes, title
            FROM review 
                JOIN movie ON movie.movie_id = review.movie_id
            WHERE user_id = {user_id};'''
        )

    reviews = []
    for review in cur.fetchall():
        item = {}
        item['review_id'] = review[0]
        item['comment'] = review[1]
        item['score'] = review[2]
        item['num_likes'] = review[3]
        item['title'] = review[4]
        reviews.append(item)
    conn.close()
    return reviews

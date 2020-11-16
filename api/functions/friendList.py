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
from functions.bannedList import check_banned_user_exists 

#friendList_add adds a user (designated by f_id) to the current logged in
#user's (designated by u_id) friend list.
def friendList_add(u_id, f_id):
    if u_id == f_id:
        return {"error": "You cannot add yourself to your friend list"}

    if check_friend_exists(u_id, f_id) is True:
        return {"error": "User is already in your friend list"}

    if check_banned_user_exists(u_id, f_id) is True:
        return {"error": "User is in your ban list"}

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(
        f"""
        INSERT INTO friend_list(user_id, friend_id)
        VALUES ({u_id}, {f_id});
        """
    )
    conn.commit()
    conn.close()
    return {"success": 1}

#friendList_unblock removes a user (designated by f_id) from the current logged in
#user's (designated by u_id) banlist. Cannot remove user if they aren't in the banlist
def friendList_delete(u_id, f_id):
    if check_friend_exists(u_id, f_id) is False:
        return {"error": "User you are trying to delete isn't currently in your friend list"}

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"DELETE FROM friend_list WHERE user_id='{u_id}' AND friend_id='{f_id}';")
    conn.commit()
    conn.close()
    return {"success": 1}

#friendList_view returns the current logged in user's banlist
def friendList_view(u_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"SELECT friend_id FROM friend_list WHERE user_id='{u_id}';")
    friend_list = c.fetchall()
    f_list = []
    for item in friend_list:
        f_list.append(item[0])
    conn.close()
    return {"friend_list": f_list}

#Returns false if it fails to find the user and matching friend 
#user in the database, otherwise returns true
def check_friend_exists(u_id, f_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"SELECT * FROM friend_list WHERE user_id='{u_id}' AND friend_id='{f_id}'")
    userData = c.fetchone()
    print(userData)
    if userData != None:
        return True
    return False

def notification_view(u_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"SELECT message FROM notifications WHERE user_id='{u_id}';")
    notification_list = c.fetchall()
    n_list = []
    for item in notification_list:
        n_list.append(item[0])
    conn.close()
    print(n_list)
    return {"notification_list": n_list}

def notification_remove(u_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"DELETE FROM notifications WHERE user_id='{u_id}';")
    conn.commit()
    conn.close()
    return {"success": 1}

# Checks the movie is in both users wishlist
#If 1 is following 2 and 2 adds a movie to there wishlist that is also in 1's wishlist
#Send a notification
def friendList_notify(u_id, movie_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(
        f"""
        SELECT user_id FROM friend_list WHERE friend_id='{u_id}' AND user_id IN (SELECT user_id FROM wishlist WHERE movie_id='{movie_id}');
        """
    )
    userList = c.fetchall()
    for user in userList:
        print(user[0])
        c.execute(
            f"""
            INSERT INTO notifications(user_id, message) VALUES({user[0]}, "{u_id} {movie_id}");
            """
        )
    conn.commit()
    conn.close()
    return {"success": 1}

#Taste compatiblity (based on user reviews)
def friendList_compatibility(u_id, f_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(
        f"""
        SELECT avg(score) FROM review 
        WHERE user_id={u_id} or user_id={f_id} 
        GROUP BY movie_id;
        """
    )
    scoreList = c.fetchall()
    sumScore = 0
    for score in scoreList:
        sumScore = sumScore + score[0]
    if sumScore == 0:
        return {"error": "User has no common movie reviews"}
    average = sumScore/len(scoreList)
    average = average/10
    percentage = "{:.0%}".format(average)
    print(scoreList)
    conn.close()
    return {"Compatibility": percentage}
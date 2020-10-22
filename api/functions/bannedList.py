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

def bannedList_block(u_id, b_id):
    
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    if u_id == b_id:
        return {"error": "You cannot add yourself to your banned list"}
    if check_banned_user_exists(u_id, b_id) is True:
        return {"error": "User is already in your banned list"}
    c.execute(
        f"""
        INSERT INTO banned_list(user_id, banned_id)
        VALUES ({u_id}, {b_id});
        """
    )
    conn.commit()
    conn.close()
    return {"success": "True"}

def bannedList_unblock(u_id, b_id):

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    if check_banned_user_exists(u_id, b_id) is False:
        return {"error": "User you are trying to ban isn't currently in your banned list"}
    c.execute(f"DELETE FROM banned_list WHERE user_id='{u_id}' AND banned_id='{b_id}';")
    conn.commit()
    conn.close()
    return {"success": "True"}

def bannedList_view(u_id):

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"SELECT banned_id FROM banned_list WHERE user_id='{u_id}';")
    banned_list = c.fetchall()
    b_list = []
    for item in banned_list:
        b_list.append(item[0])
    conn.close()
    return {"banned_list": b_list}

#Returns false if it fails to find the user and matching banned 
# user in the database, otherwise returns true
def check_banned_user_exists(u_id, b_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"SELECT * FROM banned_list WHERE user_id='{u_id}' AND banned_id='{b_id}'")
    userData = c.fetchone()
    print(userData)
    if userData != None:
        return True
    return False
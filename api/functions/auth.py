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

USER_LIST = []
REGEX = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
PASSWORDREGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" # at least 8 characters, one number one uppercase one lowercase

# Secret question field??
def auth_register(
    email, password, first_name, last_name, secret_question, secret_answer
):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users;")
    new_user_id = len(c.fetchall()) + 1
    #Check email
    check = check_valid_email(email)
    if "error" in check:
        return check
    # Check password
    check = check_valid_password(password)
    if "error" in check:
        return check    
    # Check names
    check = check_valid_names(first_name, last_name)
    if "error" in check:
        return check
    c.execute(
        f"""
        INSERT INTO users(user_id, first_name, last_name, email, password, secret_question, secret_answer)
        VALUES ({new_user_id}, "{first_name}", "{last_name}", "{email}", "{hashed_password}", "{secret_question}", "{secret_answer}");
        """
    )
    conn.commit()
    conn.close()
    return {
        'u_id': new_user_id,
    }

def update_password(email, newP):
    # Check if password matches regex
    if re.match(PASSWORDREGEX, newP):
        # Valid password was entered    
        hashed_password = hashlib.sha256(newP.encode()).hexdigest()
        conn = sqlite3.connect("users.db")
        c = conn.cursor()
        c.execute(f"UPDATE users SET password = '{hashed_password}' WHERE email = '{email}';")
        conn.commit()
        conn.close()
        return {"success": 1}
    return {"error": "Old Password is incorrect"}


def auth_login(email, password):
    # return token 
    # process user details 
    # add to database 
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f'SELECT password FROM users WHERE email=("{email}")')
    selected_password = c.fetchone()

    get_user_id(email)
    print(selected_password)
    if selected_password == None or selected_password[0] != hashed_password:
        return {"error": "Invalid Login"}
    u_id = get_user_id(email)
    if u_id == False:
        return {"error": "Invalid Login"}
    USER_LIST.append(u_id)
    return get_user_details(u_id)

def auth_logout(u_id):
    USER_LIST.remove(u_id)
    return get_user_details(u_id)

def auth_resetpass(email, secretAnswer):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    #Search for email
    #Search for emails Secret questions
    #Compare secret question with secret answer
    c.execute(f'SELECT secret_answer FROM users WHERE email=("{email}")')
    selectedAnswer = c.fetchone()
    # if selectedAnswer[0] != secretAnswer:
    #     return "Incorrect answer, please try again"
    # else:
    #     return "Correct answer!"


######################  HELPER FUNCTIONS  ########################


def check_valid_email(email):
    # Case 1 check valid format
    if not re.match(REGEX, email):
        return {"error" : "{email} is not in correct form"}
    # Case 2 check email doesn't already exist
    if get_user_id(email) != False:
        return {"error" : "{email} is already reigstered"}
    return {"success" : 1}

def check_valid_password(password):
    if len(password) < 6:
        return {"error" : "Password must be at least 6 characters long"}
    return {"success" : 1}


def check_valid_names(first_name, last_name):
    maxlen = 50
    minlen = 1
    if len(first_name) > maxlen:
        return {"error" : "{first_name} is longer than 50 characters"}
    if len(first_name) < minlen:
        return {"error" : "First name cannot be empty"}
    if len(last_name) > maxlen:
        return {"error" : "{last_name} is longer than 50 characters"}
    if len(last_name) < minlen:
        return {"error" : "Last name cannot be empty"}
    return {"success" : 1}

def get_user_id(email):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute(f'SELECT user_id FROM users WHERE email=("{email}")')
    u_id = c.fetchone()
    if u_id is None:
        return False
    return u_id[0]

def get_user_details(u_id):
    # search user with id and return details
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f'SELECT * FROM users WHERE user_id=("{u_id}")')
    data = c.fetchall()
    u_id = data[0][0]
    first_name = data[0][1]
    last_name = data[0][2]
    email = data[0][3]
    return {
        'u_id': u_id,
        'first_name': first_name,
        'last_name': last_name,
        'email': email, 
        'wishlist': ["a", "b", "c"],
        'banlist': ["d", "e", "f"],
        'profile_picture': "sample link to profile"
    }
    
def get_secret_question(u_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"select secret_question from users where user_id = {u_id};")
    question = c.fetchone()[0]
    conn.close()
    return question


def get_secret_answer(u_id):
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f"select secret_answer from users where user_id = {u_id}")
    answer = c.fetchone()[0]
    conn.close()
    return answer
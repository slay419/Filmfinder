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
REGEX = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

# Secret question field??
def auth_register(email, password, first_name, last_name, secret_question, secret_answer):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    u_id = 12345
    token = "test token"
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users;')
    new_user_id = len(c.fetchall()) + 1
    # Add new user to the database
    # May need to consider tokens and admin privlidges to add

    #Check email
    check_valid_email(email)
    #Check password
    check_valid_password(password)
    #Check names
    check_valid_names(first_name, last_name)

    c.execute(
        f'''
        INSERT INTO users(user_id, first_name, last_name, email, password, secret_question, secret_answer)
        VALUES ({new_user_id}, "{first_name}", "{last_name}", "{email}", "{hashed_password}", "{secret_question}", "{secret_answer}")
        '''
    )
    conn.commit()
    # #prepare u_id, token and password (hashed in db)
    # hashed_password = hash_password(password)
    # u_id = 101 + len(data['users'])
    # token = generate_token(u_id)

    # #generate appropriate permission id
    # permission_id = generate_permission_id()

    # #append all relevant information to users dictionary
    # data['users'].append({
    #     'email' : email,
    #     'password' : hashed_password,
    #     'first_name' : first_name,
    #     'last_name' : last_name,
    #     'u_id': u_id,
    #     'permission_id' : permission_id,
    #     'handle' : handle,
    #     'tokens'  : [token],
    #     'reset_code' : None,
    #     'profile_img_url' : None
    # })
    # #auth_login(email, password)
    conn.close()
    return {
        'u_id': new_user_id,
        'token' : token
    }

def auth_login(email, password):
    # return token 
    # process user details 
        # add to database 
        # 
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute(f'SELECT password FROM users WHERE email=("{email}")')
    selected_password = c.fetchone()
    get_user_id(email)
    print(selected_password)
    if selected_password[0] != hashed_password:
        u_id = 0
        raise ValueError("Invalid password please try again")
    u_id = get_user_id(email)
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

# bcrypt to hash password
def get_user_details(u_id):
    # search user with id and return details
    return {
        'u_id': u_id,
        'first_name': "sampleFirstName",
        'last_name': "sampleLastName",
        'email': "sampleEmail", 
        'wishlist': ["a", "b", "c"],
        'banlist': ["d", "e", "f"],
        'profile_picture': "sample link to profile"
    }

def get_user_id(email):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute(f'SELECT user_id FROM users WHERE email=("{email}")')
    u_id = c.fetchone()
    if u_id is None:
        return -1
    return u_id[0]

def check_valid_email(email):
    #Case 1 check valid format
    if not re.match(REGEX, email):
        raise ValueError(f"Email: {email} is not in the right form.")
    #Case 2 check email doesn't already exist
    if get_user_id(email) != -1:
        raise ValueError(f"Email: {email} is already registered.")

def check_valid_password(password):
    if len(password) < 6:
        raise ValueError(f"Password: {password} must be at least 6 characters long.")

def check_valid_names(first_name, last_name):
    maxlen = 50
    minlen = 1
    if len(first_name) > maxlen:
        raise ValueError(f"First name: {first_name} is longer than 50 characters")
    if len(first_name) < minlen:
        raise ValueError(f"First name: {first_name} cannot be empty")
    if len(last_name) > maxlen:
        raise ValueError(f"Last name: {last_name} is longer than 50 characters")
    if len(last_name) < minlen:
        raise ValueError(f"Last name: {last_name} cannot be empty")
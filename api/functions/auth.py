import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

USER_LIST = []


# Secret question field??
def auth_register(email, password, name_first, name_last):
    u_id = 12345
    token = "test token"
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users;')
    new_user_id = len(c.fetchall()) + 1
    print(new_user_id)

    # Add new user to the database
    # May need to consider tokens and admin privlidges to add
    c.execute(
        f'''
        INSERT INTO users(user_id, first_name, last_name, email, password)
        VALUES ({new_user_id}, "{name_first}", "{name_last}", "{email}", "{password}")
        '''
    )

    c.execute('SELECT * FROM users;')
    print(c.fetchall())
    conn.commit()

    # data = get_data()

    # #check if email already exist
    # if valid_email(email):
    #     if get_u_id(email) is not None:
    #         raise ValueError(f"Email: {email} is already registered")
    # else:
    #     raise ValueError(f"Email: {email} is invalid")

    # #rules for length of pasword
    # min_length = 6
    # if len(password) < min_length:
    #     raise ValueError(f"Password Length is too short")

    # #check first and last name is valid in accordance to specs
    # name_check(name_first, name_last)

    # #create a unique handle
    # handle = ''.join((name_first, name_last))
    # generate_handle(handle)

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
    #     'name_first' : name_first,
    #     'name_last' : name_last,
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
        'u_id': u_id,
        'token' : token
    }


def auth_login(email, password):
    # return token 
    # process user details 
        # add to database 
        # 
    u_id = 12345
    return get_user_details(u_id)

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
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

def profile_update(u_id, fname, lname, secretQ, secretA):

    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute(f"""
        UPDATE users 
        SET first_name = '{fname}',
        last_name = '{lname}',
        secret_question = '{secretQ}',
        secret_answer = '{secretA}'
        WHERE user_id = '{u_id}';
        """
    )
    conn.commit()
    conn.close()
    return {"success": "true"}
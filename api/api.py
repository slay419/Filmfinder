import time
from flask import Flask
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

app = Flask(__name__)
app.config["SECRET_KEY"] = "you-will-never-guess"

api = Api(
    app,
    version="1.0",
    title="Film Finder API",
    description="an api to help us find some films LOL",
)

title_parser = reqparse.RequestParser()
title_parser.add_argument("title", type=str)


def read_from_sqlite(database_file, table_name):
    conn = sqlite3.connect(database_file)
    return sql.read_sql("select * from " + table_name, conn)


@app.route("/time")
def get_current_time():
    return {"time": time.time()}


@api.route("/api/movies")
class Movie(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(title_parser)
    def get(self):
        title_str = title_parser.parse_args().get("title")
        conn = sqlite3.connect("../../db/movies.db")

        if title_str is None:
            df = sql.read_sql("select * from MOVIES limit 15", conn,)
            return {"movies": df.to_dict("id")}

        df = sql.read_sql(
            "select * from MOVIES m where m.original_title like '%"
            + title_str
            + "%' limit 15",
            conn,
        )
        return {"movies": df.to_dict("id")}


@app.route("/api/movies/<int:id>")
def getMovieById(id):
    conn = sqlite3.connect("../../db/movies.db")
    df = sql.read_sql("select * from MOVIES m where m.id = " + str(id), conn,)

    return {"movie": df.to_dict("id")}


if __name__ == "__main__":
    app.run(port=5000)

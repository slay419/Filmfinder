import time
from flask import Flask, request
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

from functions.auth import auth_login, auth_register

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


# Todo: make it return results which have matching in the title, description and genre
@api.route("/api/movies")
class Movie(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(title_parser)
    def get(self):
        title_str = title_parser.parse_args().get("title") 
        conn = sqlite3.connect("./movieDB.db")
        cur = conn.cursor()
        movies = {}
        if title_str is None:
            cur.execute("select * from MOVIE limit 15")
            
        else:
            cur.execute(
                f"""
                create view temp_id as
                select movie_id from movie where title like "%{title_str}%"
                union
                select movie_id from genre where genre like "%{title_str}%"
                union 
                select movie_id from movie where overview like "% {title_str} %";
                """
            )

            cur.execute("select * from movie m join temp_id t on m.movie_id = t.movie_id limit 15;")
                #return {"movies": df.to_dict("id")}
            
        index = 0
        for movie in cur.fetchall():
            print(movie)
            item = {}
            item['movie_id'] = movie[0]
            item['director_id'] = movie[1]
            item['adult'] = movie[2]
            item['title'] = movie[3]
            item['release_date'] = movie[4]
            item['runtime'] = movie[5]
            item['budget'] = movie[6]
            item['revenue'] = movie[7]
            item['imdb_id'] = movie[8]
            item['language'] = movie[9]
            item['overview'] = movie[10]
            item['tagline'] = movie[11]
            item['poster'] = movie[12]
            item['vote_avg'] = movie[13]
            item['vote_count'] = movie[14]
            item['genres'] = getGenreList(item['movie_id'])
            movies[index] = item
            index += 1
        cur.execute("drop view temp_id;")
        return {"movies": movies}


        '''
        if title_str is None:
            df = sql.read_sql("select * from MOVIE limit 15", conn,)
            return {"movies": df.to_dict("id")}

        df = sql.read_sql(
            "select * from MOVIE m where m.title like '%" + title_str + "%' limit 15",
            conn,
        )

        #return {"movies": df.to_dict("id")}
        '''


@app.route("/api/movies/<int:id>")
def getMovieById(id):
    conn = sqlite3.connect("./movieDB.db")
    df = sql.read_sql("select * from MOVIE m where m.movie_id = " + str(id), conn,)

    return {"movie": df.set_index("movie_id").to_dict("index")}


@app.route("/api/cast/<int:movie_id>", methods=["POST"])
def getCastByMovieId(movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(
        f"""
        select c.cast_name
        from cast c join acting a on c.cast_id = a.actor_id
        where a.movie_id = {movie_id};
        """
    )
    cast_list = []
    for cast in cur.fetchall():
        cast_list.append(cast[0])
    print(cast_list)

    conn.close()
    return {"cast": cast_list}
    #returns {cast: {...}} or {cast: [...]}


@app.route("/api/genres/<int:movie_id>", methods=["POST"])
def getGenresByMovieId(movie_id):
    genres = getGenreList(movie_id)
    return {"genres": genres}
    #returns {genres: {...}} or {genres: [...]}


############### Login #####################


@app.route("/auth/login", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    return auth_login(email, password)


@app.route("/auth/register", methods=["POST"])
def register():
    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")

    # print(email)
    # print(password)
    # print(first_name)
    # print(last_name)

    # if valid then return user
    return auth_register(email, password, first_name, last_name)


############### Helper Functions #################

def getGenreList(movie_id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select genre from GENRE where movie_id = {movie_id};")
    genres = []
    for genre in cur.fetchall():
        genres.append(genre[0])
    print(genres)
    conn.close()

    return genres




if __name__ == "__main__":
    app.run(port=5000)

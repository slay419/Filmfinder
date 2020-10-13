import time
from flask import Flask, request
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re

from functions.auth import auth_login, auth_register, get_secret_question, get_secret_answer
from functions.search import searchGenre, searchKeyword, searchDirector, extractMovieDetails, getGenreList, getCastList

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
        # Change the sql query depending on if a search term was given or not
        if title_str is None:
            cur.execute("select * from MOVIE limit 15")
        
        else:
            # Search through movie titles, overview and genre for matching keywords in that order
            cur.execute(
                f"""
                create view temp_id as
                select movie_id, 0 as subquery from movie where title like "%{title_str}%"
                union
                select movie_id, 2 from genre where genre like "%{title_str}%"
                union 
                select movie_id, 1 from movie where overview like "% {title_str} %";
                """
            )

            cur.execute("select * from movie m join temp_id t on m.movie_id = t.movie_id group by m.movie_id order by t.subquery limit 15;")
            #return {"movies": df.to_dict("id")}
            
        index = 0
        # Extract movie information and populate dictionary 
        for movie in cur.fetchall():
            item = extractMovieDetails(movie)
            movies[index] = item
            index += 1
            

        cur.execute("drop view IF EXISTS temp_id;")
        return {"movies": movies}



@app.route("/api/movies/<int:id>")
def getMovieById(id):
    conn = sqlite3.connect("./movieDB.db")
    cur = conn.cursor()
    cur.execute(f"select * from MOVIE where movie_id = {id}")
    movie = cur.fetchone()
    item = {}
    item["director_id"] = movie[1]
    item["adult"] = movie[2]
    item["title"] = movie[3]
    item["release_date"] = movie[4]
    item["runtime"] = movie[5]
    item["budget"] = movie[6]
    item["revenue"] = movie[7]
    item["imdb_id"] = movie[8]
    item["language"] = movie[9]
    item["overview"] = movie[10]
    item["tagline"] = movie[11]
    item["poster"] = movie[12]
    item["vote_avg"] = movie[13]
    item["vote_count"] = movie[14]
    item["genres"] = getGenreList(id)
    item["cast"] = getCastList(id)
    result = {}
    result[id] = item

    conn.close()
    return {"movie": result}



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
    secret_question = request.form.get("secret_question")
    secret_answer = request.form.get("secret_answer")

    # print(email)
    # print(password)
    # print(first_name)
    # print(last_name)

    # if valid then return user
    return auth_register(email, password, first_name, last_name, secret_question, secret_answer)

@app.route("/auth/changepass")
def ChangePassword():
    oldPassword = request.form.get("old_password")
    newPassword = request.form.get("new_password")
    # return something (maybe TRUE if sucessful, dunno however you want to do it)
    return (True)


@app.route("/auth/testing", methods=["POST"])
def test():
    question = get_secret_question(1)
    print(f"question is {question}")
    return {"question": question} 

#################   Search    ##################

@app.route("/api/search/byGenre", methods=["POST"])
def searchMovieByGenre():
    genre = request.form.get("genre")
    return searchGenre(genre)

@app.route("/api/search/byKeyword", methods=["POST"])
def searchMovieByKeyword():
    keyword = request.form.get("keyword")
    return searchKeyword(keyword)

@app.route("/api/search/byDirector", methods=["POST"])
def searchMovieByDirector():
    director = request.form.get("director")
    return searchDirector(director)


@app.route("/api/cast/<int:movie_id>", methods=["POST"])
def getCastByMovieId(movie_id):
    cast_list = getCastList(movie_id)
    return {"cast": cast_list}


@app.route("/api/genres/<int:movie_id>", methods=["POST"])
def getGenresByMovieId(movie_id):
    genres = getGenreList(movie_id)
    return {"genres": genres}





if __name__ == "__main__":
    app.run(port=5000) 

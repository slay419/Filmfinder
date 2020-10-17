import time
from flask import Flask, request
from flask_restplus import Resource, Api, fields, reqparse, inputs
import sqlite3
import json
import pandas as pd
from pandas.io import sql
from requests import get
import re
import hashlib

from functions.auth import (
    auth_login,
    auth_register,
    get_secret_question,
    get_secret_answer,
    get_user_id,
    auth_logout,
    update_password,
)
from functions.search import (
    searchGenre,
    searchKeyword,
    searchDirector,
    extractMovieDetails,
    getGenreList,
    getCastList,
    getDirectorById,
    searchSimilarMovies
)
from functions.review import newReview, incrementLikes, editReview, getMovieReviewList

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

genre_parser = reqparse.RequestParser()
genre_parser.add_argument("genre", type=str)

director_parser = reqparse.RequestParser()
director_parser.add_argument("director", type=str)

movie_id_parser = reqparse.RequestParser()
movie_id_parser.add_argument("movie_id", type=int)


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

            cur.execute(
                "select * from movie m join temp_id t on m.movie_id = t.movie_id group by m.movie_id order by t.subquery limit 15;"
            )
            # return {"movies": df.to_dict("id")}

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
    item["movie_id"] = movie[0]
    item["director_id"] = movie[1]
    item["director_name"] = getDirectorById(movie[1])
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


############### Auth Functions #####################

# return statements
# error: wrongLogin
# user details as dictionary
@app.route("/auth/login", methods=["POST"])
def login():
    response = request.get_json()
    email = response["email"]
    password = response["password"]
    print(response)
    return auth_login(email, password)


@app.route("/auth/logout", methods=["POST"])
def logout():
    response = request.get_json()
    u_id = response["u_id"]

    return auth_logout(u_id)


@app.route("/auth/register", methods=["POST"])
def register():
    response = request.get_json()
    email = response["email"]
    password = response["password"]
    first_name = response["first_name"]
    last_name = response["last_name"]
    secret_question = response["secret_question"]
    secret_answer = response["secret_answer"]

    # if valid then return user
    return auth_register(
        email, password, first_name, last_name, secret_question, secret_answer
    )


############### Accounts #####################

# these are the return values
# error: samePassword
# error: incorrectPassword
# success: 1
@app.route("/auth/changepass", methods=["POST"])
def ChangePassword():
    response = request.get_json()
    email = response["email"]
    oldPassword = response["old_password"]
    newPassword = response["new_password"]
    if newPassword == oldPassword:
        return {"error": "New password is the same as old password"}
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    hashed_password = hashlib.sha256(oldPassword.encode()).hexdigest()
    cur.execute(f"select password from users where email=('{email}')")
    checkPass = cur.fetchone()
    print(checkPass[0])
    if hashed_password != checkPass[0]:
        return {"error": "Old password is incorrect"}
    return update_password(email, newPassword)


# returns error: incorrectPassword
# returns success: 1
@app.route("/auth/resetpassword", methods=["POST"])
def resetPassword():
    response = request.get_json()
    email = response["email"]
    newPassword = response["password"]
    # return something (maybe TRUE if sucessful, dunno however you want to do it)
    return update_password(email, newPassword)


@app.route("/auth/testing", methods=["POST"])
def test():
    question = get_secret_question(1)
    print(f"question is {question}")
    return {"question": question}


@app.route("/auth/getQuestion", methods=["POST"])
def getSecretQuestion():
    response = request.get_json()
    email = response["email"]
    print(email)
    u_id = get_user_id(email)
    print(u_id)
    question = get_secret_question(u_id)
    return {"question": question}
    # return ({"question": "What is Blue"})


@app.route("/auth/getAnswer", methods=["POST"])
def getSecretAnswer():
    response = request.get_json()
    email = response["email"]
    answer = response["answer"]
    print(email)
    u_id = get_user_id(email)
    print(u_id)
    newAnswer = get_secret_answer(u_id)
    if newAnswer == answer:
        return {"answer": 2}
    else:
        return {"answer": 1}


############### Search ###############

@api.route("/api/search/byGenre")
class Genre(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(genre_parser)
    def get(self):
        genre_str = genre_parser.parse_args().get("genre")
        return searchGenre(genre_str)


@api.route("/api/search/byDirector")
class Director(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(director_parser)
    def get(self):
        director_str = director_parser.parse_args().get("director")
        return searchDirector(director_str)


@app.route("/api/search/byKeyword", methods=["POST"])
def searchMovieByKeyword():
    keyword = request.form.get("keyword")
    return searchKeyword(keyword)


@app.route("/api/cast/<int:movie_id>", methods=["POST"])
def getCastByMovieId(movie_id):
    cast_list = getCastList(movie_id)
    return {"cast": cast_list}


@app.route("/api/genres/<int:movie_id>", methods=["POST"])
def getGenresByMovieId(movie_id):
    genres = getGenreList(movie_id)
    return {"genres": genres}

@app.route("/api/movies/similarTo/<int:movie_id>", methods=["GET"])
def getSimilarMovies(movie_id):
    return searchSimilarMovies(movie_id)


################    Review    ##################


@app.route("/api/review/createReview", methods=["POST"])
def createReviewForMovie():
    response = request.get_json(force=True)
    user_id = response["user_id"]
    movie_id = response["movie_id"]
    comment = response["comment"]
    score = int(response["score"])
    return newReview(user_id, movie_id, comment, score)


@app.route("/api/review/likeReviewComment", methods=["POST"])
def likeReviewComment():
    review_id = int(request.form.get("review_id"))
    return incrementLikes(review_id)


@app.route("/api/review/editMovieReview", methods=["POST"])
def editMovieReview():
    review_id = int(request.form.get("review_id"))
    comment = request.form.get("comment")
    score = int(request.form.get("score"))
    return editReview(review_id, comment, score)


@api.route("/api/review/getMovieReviews")
class MovieReivews(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(movie_id_parser)
    def get(self):
        movie_id_int = movie_id_parser.parse_args().get("movie_id")
        review_list = getMovieReviewList(movie_id_int)
        return {"reviews": review_list}


if __name__ == "__main__":
    app.run(port=5000)


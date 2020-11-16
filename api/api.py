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
    get_user_details,
    check_confirmation_code
)
from functions.profile import (
    profile_update
)
from functions.search import (
    searchGenre,
    searchKeyword,
    searchDirector,
    extractMovieDetails,
    getGenreList,
    getCastList,
    getDirectorById,
    searchSimilarMovies,
    searchRecommendedMovies,
    searchMoviesByActor
)
from functions.review import (
    newReview, 
    incrementLikes, 
    editReview,
    deleteReview,
    getMovieReviewList,
    getReviews
)

from functions.bannedList import (
    bannedList_block,
    bannedList_unblock,
    bannedList_view,
    check_banned_user_exists
)

from functions.wishlist import (
    checkWishlist,
    addWishlist,
    getUserWishlist,
    removeFromWishlist
)

from functions.friendList import (
    friendList_add,
    friendList_delete,
    friendList_view,
    friendList_compatibility,
    notification_view,
    notification_remove,
    check_friend_exists
)

from functions.admin import (
    assignAdmin,
    checkAdmin,
    addNewMovie,
    removeExistingMovie,
    removeUserById,
    editMovieDetails,
    editMovieCast,
    editMovieGenres
)

app = Flask(__name__)
app.config["SECRET_KEY"] = "you-will-never-guess"

api = Api(
    app, 
    version="1.0",
    title="Film Finder API",
    description="an api to help us find some films LOL",
)

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='filmfindercomp3900@gmail.com',
    MAIL_PASSWORD="fortniteforlife"
)

title_parser = reqparse.RequestParser()
title_parser.add_argument("title", type=str)

genre_parser = reqparse.RequestParser()
genre_parser.add_argument("genre", type=str)

director_parser = reqparse.RequestParser()
director_parser.add_argument("director", type=str)

movie_id_parser = reqparse.RequestParser()
movie_id_parser.add_argument("movie_id", type=int)

actor_parser = reqparse.RequestParser()
actor_parser.add_argument("actor", type=str)


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
            cur.execute("select * from MOVIE limit 300")
            #cur.execute("select * from MOVIE where vote_count > 1000 order by vote_avg desc limit 15;")

        else:
            # Search through movie titles, overview and genre for matching keywords in that order
            cur.execute("drop view IF EXISTS temp_id;")
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
                "select * from movie m join temp_id t on m.movie_id = t.movie_id group by m.movie_id order by t.subquery limit 600;"
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

#   Kevin's notes for frontend
#   Registering needs one more field to confirm matching passwords
#       returns a new error message if not matching: "Passwords do not match"
#   after registering - now need to redirect to a page with a confirmation code text field
#       can backend store the email? if not then get user to enter email again
#   new route has been made for the redirect page: /auth/confirmEmail
#       returns a dicitonary with the user id and also some error messages
#   login now performs a check to see if the user has confirmed their email first before logging in
#       login also has one more error message: "User has not verified their email address yet"



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
    password_confirmation = response["password_confirmation"]
    first_name = response["first_name"]
    last_name = response["last_name"]
    secret_question = response["secret_question"]
    secret_answer = response["secret_answer"]

    # if valid then return user
    return auth_register(
        email, password, password_confirmation, first_name, last_name, secret_question, secret_answer, app
    )

@app.route("/auth/confirmEmail", methods=["POST"])
def confirm():
    response = request.get_json()
    email = response["email"]
    code = response["confirmation_code"]
    return check_confirmation_code(email, code)


############### Accounts #####################

# these are the return values
# error: samePassword
# error: incorrectPassword
# success: 1
@app.route("/profile/auth/changepass", methods=["POST"])
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

@app.route("/api/users/<int:id>")
def getUserById(id):
    conn = sqlite3.connect("./users.db")
    cur = conn.cursor()
    cur.execute(f"select * from users where user_id = {id}")
    user = cur.fetchone()
    item = {}
    item["user_id"] = user[0]
    item["first_name"] = user[1]
    item["last_name"] = user[2]
    conn.close()
    return item


@app.route("/auth/getuser", methods=["POST"])
def getUser():
    response = request.get_json()
    u_id = response["u_id"]
    return get_user_details(u_id)

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

@api.route("/api/search/actedIn")
class ActedIn(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(actor_parser)
    def get(self):
        actor_str = actor_parser.parse_args().get("actor")
        return searchMoviesByActor(actor_str)

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



################   Profile    ##################

@app.route("/profile/update", methods=["POST"])
def updateDetails():
    response = request.get_json()
    u_id = response["u_id"]
    fname = response["fname"]
    lname = response["lname"]
    secretQ = response["secretQ"]
    secretA = response["secretA"]
    # this function is for updating the details in u_id's profile
    # hopefully someone else can implement it
    return profile_update(u_id, fname, lname, secretQ, secretA)


@app.route("/profile/reviews", methods=["POST"])
def getUserReviews():
    response = request.get_json()
    u_id = response["u_id"]
    review_list = getReviews(u_id)
    return {"reviews_list": review_list}

################   Wishlist   ##################

## Placeholder: Need to check
# adds movie_id to user_id's wishlist
# return {"success" : 1} if successful
@app.route("/api/wishlist/add", methods=["POST"]) 
def addToWishlist():
    response = request.get_json()
    user_id = response["u_id"]
    movie_id = response["movie_id"]
    return addWishlist(user_id, movie_id)

# Returns true or false 
# Front end uses this so we can change from add to wishlist / remove from wishlist
@app.route("/api/wishlist/check", methods=["POST"])
def checkInWishlist():
    response = request.get_json()
    user_id = response["u_id"]
    movie_id = response["movie_id"]
    if checkWishlist(user_id, movie_id):
        return {"success": 1}
    return {"success": 0}

## Placeholder: Need to check
# just copied and pasted from movies search to finish front end
# should just need to adjust sql statements to fix it
@app.route("/api/wishlist/get", methods=["POST"])
def getWishlist():
    response = request.get_json()
    u_id = response["u_id"]
    return getUserWishlist(u_id)

# removes the movie_id element from the users wishlist and returns the new wishlst
## Placeholder: Need to check
@app.route("/api/wishlist/remove", methods=["POST"])
def removeWishlist():
    response = request.get_json()
    u_id = response["u_id"]
    movie_id = response["movie_id"]
    # returns the wishlist with the movie id element removed
    removeFromWishlist(u_id, movie_id)

    return getUserWishlist(u_id)

#############   Recommendations   ##############
@app.route("/api/movies/similarTo/<int:movie_id>", methods=["GET"])
def getSimilarMovies(movie_id):
    return searchSimilarMovies(movie_id)

@app.route("/api/movies/recommendedFor/<int:user_id>", methods=["GET"])
def getRecommendedMovies(user_id):
    return searchRecommendedMovies(user_id)

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
    response = request.get_json(force=True)
    review_id = int(response["review_id"])
    comment = response["comment"]
    score = int(response["score"])
    return editReview(review_id, comment, score)


@app.route("/api/review/deleteMovieReview", methods=["DELETE"])
def deleteReviewForMovie():
    response = request.get_json(force=True)
    review_id = response["review_id"]
    return deleteReview(review_id)


@api.route("/api/review/getMovieReviews")
class MovieReviews(Resource):
    @api.response(200, "OK")
    @api.response(201, "Created")
    @api.response(400, "Bad Request")
    @api.response(404, "Not Found")
    @api.expect(movie_id_parser)
    def get(self):
        movie_id_int = movie_id_parser.parse_args().get("movie_id")
        review_list = getMovieReviewList(movie_id_int) #hardcorded hope it works
        return {"reviews": review_list}


################    Banned List    ##################


@app.route("/api/bannedList/block", methods=["POST"])
def block():
    response = request.get_json()
    user_id = response["user_id"]
    banned_id = response["block_id"]
    return bannedList_block(user_id, banned_id)

@app.route("/api/bannedList/unblock", methods=["POST"])
def unblock():
    response = request.get_json()
    user_id = response["user_id"]
    banned_id = response["block_id"]
    return bannedList_unblock(user_id, banned_id)

@app.route("/api/bannedList/view", methods=["POST"])
def view():
    response = request.get_json()
    user_id = response["user_id"]
    return bannedList_view(user_id)

@app.route("/api/bannedList/check", methods=["POST"])
def checkBannedList():
    response = request.get_json()
    user_id = response["u_id"]
    banned_id = response["banned_id"]
    if check_banned_user_exists(user_id, banned_id):
        return {"success": 1}
    return {"success": 0}


################    Friend List   ##################


@app.route("/api/friends/add", methods=["POST"])
def addFriend():
    response = request.get_json()
    user_id = response["user_id"]
    friend_id = response["friend_id"]
    return friendList_add(user_id, friend_id)

@app.route("/api/friends/delete", methods=["POST"])
def deleteFriend():
    response = request.get_json()
    user_id = response["user_id"]
    friend_id = response["friend_id"]
    return friendList_delete(user_id, friend_id)

@app.route("/api/friends/view", methods=["POST"])
def viewFriend():
    response = request.get_json()
    user_id = response["user_id"]
    return friendList_view(user_id)

@app.route("/api/friends/check", methods=["POST"])
def checkFriend():
    response = request.get_json()
    user_id = response["user_id"]
    friend_id = response["friend_id"]
    if check_friend_exists(user_id, friend_id):
        return ({"friend": 1})
    return ({"friend": 0})

@app.route("/api/friends/viewNotification", methods=["POST"])
def viewNotification():
    response = request.get_json()
    user_id = response["user_id"]
    return notification_view(user_id)

@app.route("/api/friends/removeNotification", methods=["POST"])
def removeNotification():
    response = request.get_json()
    user_id = response["user_id"]
    return notification_remove(user_id)

@app.route("/api/friends/compatibility", methods=["POST"])
def viewCompatibility():
    response = request.get_json()
    user_id = response["user_id"]
    friend_id = response["friend_id"]
    return friendList_compatibility(user_id, friend_id)

################    Admin Functions   ##################

@app.route("/admin/isAdmin/<int:user_id>", methods=["GET"])
def isAdmin(user_id):
    if user_id == None:
        return {"isAdmin": 0}
    return checkAdmin(user_id)

@app.route("/admin/addMovie", methods=["POST"])
def addMovie():
    response = request.get_json()
    director_name = response["director_name"]
    adult = response["adult"]
    title = response["title"]
    release_date = response["release_date"]
    overview = response["overview"]
    tagline = response["tagline"]
    poster = response["poster"]
    genres = response["genres"]
    cast = response["cast"]
    keywords = response["keywords"]
    return addNewMovie(director_name, adult, title, release_date, overview, tagline, poster, genres, cast, keywords)

@app.route("/admin/removeMovie", methods=["DELETE"])
def removeMovie():
    response = request.get_json()
    movie_id = response["movie_id"]
    return removeExistingMovie(movie_id)

@app.route("/admin/removeUser", methods=["DELETE"])
def removeUser():
    response = request.get_json()
    user_id = response["user_id"]
    return removeUserById(user_id)

@app.route("/admin/makeAdmin", methods=["POST"])
def makeAdmin():
    response = request.get_json()
    user_id = response["user_id"]
    return assignAdmin(user_id)

@app.route("/admin/updateMovieDetails/<int:movie_id>", methods=["PUT"])
def updateMovieDetails(movie_id):
    response = request.get_json()
    title = response["title"]
    release_date = response["release_date"]
    overview = response["overview"]
    tagline = response["tagline"]
    return editMovieDetails(movie_id, title, release_date, overview, tagline)

@app.route("/admin/updateMovieCast/<int:movie_id>", methods=["PUT"])
def updateMovieCast(movie_id):
    response = request.get_json()
    director_name = response["director_name"]
    cast_list = response["cast_list"]
    print(cast_list)
    return editMovieCast(movie_id, director_name, cast_list)

@app.route("/admin/updateMovieGenres/<int:movie_id>", methods=["PUT"])
def updateMovieGenres(movie_id):
    response = request.get_json()
    genre_list = response["genre_list"]
    return editMovieGenres(movie_id, genre_list)

if __name__ == "__main__":
    app.run(port=5000)


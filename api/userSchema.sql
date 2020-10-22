CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY,
    first_name text,
    last_name text,
    email text NOT NULL UNIQUE,
    password text,
    secret_question text,
    secret_answer text
);

CREATE TABLE IF NOT EXISTS review (
    review_id integer PRIMARY KEY,
    user_id integer,
    movie_id integer,
    comment text,
    score integer,
    num_likes integer
);

CREATE TABLE IF NOT EXISTS friend_list (
    user_id integer,
    friend_id integer
);

CREATE TABLE IF NOT EXISTS wishlist (
    user_id integer,
    movie_id integer
);

CREATE TABLE IF NOT EXISTS banned_list (
    user_id integer,
    banned_id integer
);
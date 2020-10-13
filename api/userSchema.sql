CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY,
    first_name text,
    last_name text,
    email text NOT NULL UNIQUE,
    password text NOT NULL CHECK (char_length(password) > 6)
);
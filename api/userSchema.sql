CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY,
    first_name text,
    last_name text,
    email text NOT NULL,
    password text NOT NULL
);


INSERT INTO users(user_id, first_name, last_name, email, password)
VALUES (1, "myfirstname", "mylastname", "myemail", "mypassword")
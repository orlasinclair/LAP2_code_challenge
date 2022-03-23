DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    name VARCHAR,
    body VARCHAR NOT NULL,
    posting_date VARCHAR
);

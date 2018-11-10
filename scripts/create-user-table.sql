DROP TYPE IF EXISTS usertype;

CREATE TYPE usertype AS ENUM ('admin', 'user');

DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "username" text CHECK(char_length("username")<=100) NOT NULL UNIQUE,
  "password" text CHECK(char_length("password")<=100) NOT NULL,
  "type" usertype
);


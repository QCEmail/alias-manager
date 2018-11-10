
CREATE TYPE usertype AS ENUM ('admin', 'user');

CREATE TYPE statustype AS ENUM ('active', 'disabled');


CREATE TABLE "users" (
  "userid" bigserial PRIMARY KEY,
  "username" text CHECK(char_length("username")<=100) NOT NULL UNIQUE,
  "password" text CHECK(char_length("password")<=100) NOT NULL,
  "type" usertype,
  "displayname" text NOT NULL,
  "mailbox" text CHECK(char_length("mailbox")<=254) NOT NULL UNIQUE
);

CREATE TABLE "addresses" (
  "address" text PRIMARY KEY CHECK(char_length("address")<=254),
  "creator" bigserial REFERENCES "users"("userid"),
  "createdate" TIMESTAMP NOT NULL,
  "status" statustype,
  "notes" text
);

CREATE TABLE "virtualaliases" (
  "userid" bigserial REFERENCES "users"("userid"),
  "address" text REFERENCES "addresses"("address")
);

DROP TABLE IF EXISTS persons CASCADE;

CREATE TABLE IF NOT EXISTS persons (
	id              SERIAL          PRIMARY KEY,
    "name"          VARCHAR         NOT NULL,
    age             INTEGER         NOT NULL,
    "address"       VARCHAR         NOT NULL,
    work            VARCHAR         NOT NULL
);
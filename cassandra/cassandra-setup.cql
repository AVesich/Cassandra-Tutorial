CREATE KEYSPACE IF NOT EXISTS shoe_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'};

USE shoe_keyspace;
CREATE TABLE IF NOT EXISTS shoes (
    name text PRIMARY KEY, -- Since we're storing each shoe type and not individual shoes, name is unique
    brand_name text,
    year_released smallint,
    description text,
    colorways set<text>
);

CREATE INDEX ON shoes (colorways); -- Allows for color filtering
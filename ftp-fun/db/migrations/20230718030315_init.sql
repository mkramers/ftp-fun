-- migrate:up
CREATE TABLE connection (
  id SERIAL PRIMARY KEY,
  host TEXT,
  user TEXT,
  verified INTEGER DEFAULT 0,
  password TEXT
);

CREATE TABLE session (
  id SERIAL PRIMARY KEY,
  connection_id INT,
  FOREIGN KEY(connection_id) REFERENCES connection(id)
);

CREATE TABLE directory_cache (
  id SERIAL PRIMARY KEY,
  session_id INT,
  tree TEXT,
  FOREIGN KEY(session_id) REFERENCES session(id)
);

-- migrate:down
DROP TABLE directory_cache;
DROP TABLE session;
DROP TABLE connection;

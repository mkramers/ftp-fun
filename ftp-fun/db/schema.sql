CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(255) primary key);
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
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20230718030315');

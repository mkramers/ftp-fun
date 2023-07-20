CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(255) primary key);
CREATE TABLE connection (
  id INTEGER PRIMARY KEY,
  hostname TEXT NOT NULL,
  port INT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  verified INTEGER  NOT NULL DEFAULT 0
);
CREATE TABLE session (
  id INTEGER PRIMARY KEY,
  connection_id INT NOT NULL,
  FOREIGN KEY(connection_id) REFERENCES connection(id)
);
CREATE TABLE directory_cache (
  id INTEGER PRIMARY KEY,
  session_id INT NOT NULL,
  tree TEXT NOT NULL,
  FOREIGN KEY(session_id) REFERENCES session(id)
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20230718030315');

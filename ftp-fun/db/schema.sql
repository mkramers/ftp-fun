CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(255) primary key);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20230718030315');

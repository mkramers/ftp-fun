import { Connection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";

export type DbConnection = Omit<Connection, "verified"> & { verified: number };

export function parseQueryResult(
  connection: Required<DbConnection>,
): Connection {
  return {
    ...connection,
    verified: connection.verified === 1,
  };
}

export async function getConnection(id: number) {
  const db = await getDb();

  const query = `SELECT * FROM connection WHERE id = $id;`;

  const dbConnection = await db.query<Required<DbConnection> | undefined>(
    query,
    {
      $id: id,
    },
  );

  if (!dbConnection) {
    return undefined;
  }

  return parseQueryResult(dbConnection);
}

export async function getConnections() {
  const db = await getDb();

  const query = `SELECT * FROM connection;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query);
  return dbConnections.map(parseQueryResult);
}

export async function updateConnection(connection: Connection) {
  const db = await getDb();

  const query = `
UPDATE connection
SET hostname = $hostname,
    port = $port,
    username = $username,
    password = $password,
    verified = $verified
WHERE id = $id
RETURNING *;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query, {
    $id: connection.id,
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
    $verified: connection.verified ? 1 : 0,
  });

  return dbConnections.map(parseQueryResult);
}

export async function deleteConnection(id: number) {
  const db = await getDb();

  const query = `
DELETE FROM connection
WHERE id = $id
RETURNING *;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query, {
    $id: id,
  });

  return dbConnections.map(parseQueryResult);
}

export async function insertConnection(connection: Omit<Connection, "id">) {
  const db = await getDb();

  const query = `INSERT INTO connection (hostname, port, username, password) VALUES ($hostname, $port, $username, $password) RETURNING *;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query, {
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
  });

  return dbConnections.map(parseQueryResult);
}

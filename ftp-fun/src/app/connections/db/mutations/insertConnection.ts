import { Connection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function insertConnection(connection: Omit<Connection, "id">) {
  const db = await getDb();

  const query = `INSERT INTO connection (hostname, port, username, password) VALUES ($hostname, $port, $username, $password) RETURNING *;`;

  const result = await db.query<Required<DbConnection>[]>(query, {
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
  });

  if (result.length > 1) {
    throw new Error("More than one connection was inserted");
  }

  return result.length > 0 ? parseQueryResult(result[0]) : undefined;
}

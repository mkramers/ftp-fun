import { ConnectionWithId } from "@/app/types/Connection";
import { getDb } from "@/app/connections/db/getDb";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function insertConnection(
  connection: Omit<ConnectionWithId, "id">,
) {
  const db = await getDb();

  const query = `INSERT INTO connection (hostname, port, username, password, verified) VALUES ($hostname, $port, $username, $password, $verified) RETURNING *;`;

  const result = await db.query<Required<DbConnection>[]>(query, {
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
    $verified: connection.verified,
  });

  if (result.length > 1) {
    throw new Error("More than one connection was inserted");
  }

  return result.length > 0 ? parseQueryResult(result[0]) : undefined;
}

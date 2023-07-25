import { Connection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

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

  const result = await db.query<Required<DbConnection>[]>(query, {
    $id: connection.id,
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
    $verified: connection.verified ? 1 : 0,
  });

  if (result.length > 1) {
    throw new Error("More than one connection was updated");
  }

  return result.length > 0 ? parseQueryResult(result[0]) : undefined;
}

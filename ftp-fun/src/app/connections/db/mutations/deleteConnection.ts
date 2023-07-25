import { getDb } from "@/app/connections/db/getDb";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function deleteConnection(id: number) {
  const db = await getDb();

  const query = `
DELETE FROM connection
WHERE id = $id
RETURNING *;`;

  const result = await db.query<Required<DbConnection>[]>(query, {
    $id: id,
  });

  if (result.length > 1) {
    throw new Error("More than one connection was updated");
  }

  return result.length > 0 ? parseQueryResult(result[0]) : undefined;
}

import { getDb } from "@/app/connections/db/getDb";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function getConnection(id: number) {
  const db = await getDb();

  const query = `SELECT * FROM connection WHERE id = $id;`;

  const result = await db.query<Required<DbConnection>[]>(query, {
    $id: id,
  });

  if (result.length > 1) {
    throw new Error(`Multiple connections found for connection id: ${id}`);
  }
  if (result.length === 0) {
    return undefined;
  }

  return parseQueryResult(result[0]);
}

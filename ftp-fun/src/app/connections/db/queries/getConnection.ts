import { getDb } from "@/app/utils/db/db";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function getConnection(id: number) {
  const db = await getDb();

  const query = `SELECT * FROM connection WHERE id = $id;`;

  const dbConnection = await db.query<Required<DbConnection> | undefined>(
    query,
    {
      $id: id,
    },
  );

  return dbConnection ? parseQueryResult(dbConnection) : undefined;
}

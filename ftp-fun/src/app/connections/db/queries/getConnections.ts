import { getDb } from "@/app/connections/db/getDb";
import { DbConnection, parseQueryResult } from "@/app/connections/db/utils";

export async function getConnections() {
  const db = await getDb();

  const query = `SELECT * FROM connection;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query);
  return dbConnections.map(parseQueryResult);
}

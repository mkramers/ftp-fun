import { Connection } from "@/app/types/Connection";

export type DbConnection = Omit<Connection, "verified"> & { verified: number };

export function parseQueryResult(
  connection: Required<DbConnection>,
): Connection {
  return {
    ...connection,
    verified: connection.verified === 1,
  };
}

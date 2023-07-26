import { ConnectionWithId } from "@/app/types/Connection";

export type DbConnection = Omit<ConnectionWithId, "verified"> & {
  verified: number;
};

export function parseQueryResult(
  connection: Required<DbConnection>,
): ConnectionWithId {
  return {
    ...connection,
    verified: connection.verified === 1,
  };
}

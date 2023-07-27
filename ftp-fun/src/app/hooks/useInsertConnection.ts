import useSWRMutation from "swr/mutation";
import {
  Connection,
  ConnectionWithId,
  tryParseConnectionWithId,
} from "@/app/types/Connection";

const insertConnection = async (url: string, { arg }: { arg: Connection }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  if (response.status !== 200) {
    console.warn(
      `Failed to insert connection with status code: ${response.status}}`,
    );
    return undefined;
  }

  const body = await response.json();
  const connection = tryParseConnectionWithId(body);

  if (!connection) {
    throw new Error("Failed to parse connection");
  }

  return connection;
};

export function useInsertConnection() {
  const { trigger } = useSWRMutation("/connections", insertConnection, {
    populateCache: (connection, connections: ConnectionWithId[]) => [
      ...connections,
      connection,
    ],
  });

  return async (connection: Connection) => {
    await trigger<ConnectionWithId[]>(connection, {
      optimisticData: (connections) =>
        connections ? [...connections, { ...connection, id: 0 }] : [],
    });
  };
}

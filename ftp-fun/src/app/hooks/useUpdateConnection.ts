import useSWRMutation from "swr/mutation";
import {
  ConnectionWithId,
  tryParseConnectionWithId,
} from "@/app/types/Connection";

const updateConnection = async (
  url: string,
  { arg }: { arg: ConnectionWithId },
) => {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
  });

  if (response.status !== 200) {
    console.warn(
      `Failed to delete connection with status code: ${response.status}}`,
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

export function useUpdateConnection() {
  const { trigger } = useSWRMutation("/connections", updateConnection, {
    populateCache: (connection, connections: ConnectionWithId[]) =>
      connections.map((c: ConnectionWithId) =>
        c.id === connection?.id ? connection : c,
      ),
  });

  return async (connection: ConnectionWithId) => {
    await trigger<ConnectionWithId[]>(connection, {
      optimisticData: (connections) =>
        connections?.map((c: ConnectionWithId) =>
          c.id === connection.id ? connection : c,
        ) ?? [],
    });
  };
}

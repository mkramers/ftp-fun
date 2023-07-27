import useSWRMutation from "swr/mutation";
import {
  ConnectionWithId,
  tryParseConnectionWithId,
} from "@/app/types/Connection";

const deleteConnection = async (
  url: string,
  { arg }: { arg: ConnectionWithId },
) => {
  const response = await fetch(url, {
    method: "DELETE",
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

export function useDeleteConnection() {
  const { trigger } = useSWRMutation("/connections", deleteConnection, {
    populateCache: (connection, connections: ConnectionWithId[]) =>
      connections.filter(({ id }) => id !== connection?.id),
  });

  return async (connection: ConnectionWithId) => {
    await trigger<ConnectionWithId[]>(connection, {
      optimisticData: (connections) =>
        connections?.filter(({ id }) => id !== connection?.id) ?? [],
    });
  };
}

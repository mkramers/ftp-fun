import useSWRMutation from "swr/mutation";
import {
  ConnectionWithId,
  tryParseConnectionWithId,
} from "@/app/types/Connection";

const removeConnection = (
  connection: ConnectionWithId | undefined,
  connections: ConnectionWithId[] | undefined,
) => {
  if (!connections || !connection) {
    return [] as ConnectionWithId[];
  }

  return connections.filter(({ id }) => id !== connection.id);
};

const deleteConnection = async (
  url: string,
  { arg }: { arg: ConnectionWithId },
) => {
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
  });
  const body = await response.json();
  return tryParseConnectionWithId(body);
};

export function useDeleteConnection() {
  const { trigger } = useSWRMutation("/connections", deleteConnection, {
    populateCache: removeConnection,
  });

  return async (connection: ConnectionWithId) => {
    await trigger<ConnectionWithId[]>(connection, {
      optimisticData: (connections) =>
        removeConnection(connection, connections),
    });
  };
}

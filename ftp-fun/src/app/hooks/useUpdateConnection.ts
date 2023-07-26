import useSWRMutation from "swr/mutation";
import { ConnectionWithId } from "@/app/types/Connection";

const updateConnection = async (
  url: string,
  { arg }: { arg: ConnectionWithId },
) =>
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useUpdateConnection() {
  const { trigger } = useSWRMutation("/connections", updateConnection, {
    populateCache: (connection, connections) =>
      connections.map((c: ConnectionWithId) =>
        c.id === connection.id ? connection : c,
      ),
  });

  return async (connection: ConnectionWithId) => {
    await trigger(connection, {
      optimisticData: (connections) =>
        connections.map((c: ConnectionWithId) =>
          c.id === connection.id ? connection : c,
        ),
    });
  };
}

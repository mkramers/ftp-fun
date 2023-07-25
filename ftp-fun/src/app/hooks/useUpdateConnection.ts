import useSWRMutation from "swr/mutation";
import { Connection } from "@/app/types/Connection";

const updateConnection = async (url: string, { arg }: { arg: Connection }) =>
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useUpdateConnection() {
  const { trigger } = useSWRMutation("/connections", updateConnection, {
    populateCache: (connection, connections) =>
      connections.map((c: Connection) =>
        c.id === connection.id ? connection : c,
      ),
  });

  return async (connection: Connection) => {
    await trigger(connection, {
      optimisticData: (connections) =>
        connections.map((c: Connection) =>
          c.id === connection.id ? connection : c,
        ),
    });
  };
}

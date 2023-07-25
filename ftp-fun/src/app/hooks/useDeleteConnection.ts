import useSWRMutation from "swr/mutation";
import { Connection } from "@/app/types/Connection";

const deleteConnection = async (
  url: string,
  { arg }: { arg: { id: number } },
) =>
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useDeleteConnection() {
  const { trigger } = useSWRMutation("/connections", deleteConnection, {
    populateCache: (connection, connections) =>
      connections.filter((c: Connection) => c.id !== connection.id),
  });

  return async (id: number) => {
    await trigger(
      { id },
      {
        optimisticData: (connections) =>
          connections.filter((c: Connection) => c.id !== id),
      },
    );
  };
}

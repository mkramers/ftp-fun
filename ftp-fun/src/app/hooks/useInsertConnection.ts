import useSWRMutation from "swr/mutation";
import { ConnectionBase } from "@/app/types/Connection";

const insertConnection = async (
  url: string,
  { arg }: { arg: ConnectionBase },
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useInsertConnection() {
  const { trigger } = useSWRMutation("/connections", insertConnection, {
    populateCache: (connection, connections) => [...connections, connection],
  });

  return async (connection: ConnectionBase) => {
    await trigger(connection, {
      optimisticData: (connections) => [
        ...connections,
        { ...connection, id: 0 },
      ],
    });
  };
}

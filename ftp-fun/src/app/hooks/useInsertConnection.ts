import useSWRMutation from "swr/mutation";
import { Connection } from "@/app/types/Connection";

const insertConnection = async (url: string, { arg }: { arg: Connection }) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useInsertConnection() {
  const { trigger } = useSWRMutation("/connections", insertConnection, {
    populateCache: (connection, connections) => [...connections, connection],
  });

  return async (connection: Connection) => {
    await trigger(connection, {
      optimisticData: (connections) => [
        ...connections,
        { ...connection, id: 0 },
      ],
    });
  };
}

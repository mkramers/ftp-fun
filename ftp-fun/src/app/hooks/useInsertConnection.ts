import useSWRMutation from "swr/mutation";
import { PartialConnection } from "@/app/types/Connection";

const insertConnection = async (
  url: string,
  { arg }: { arg: PartialConnection },
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useInsertConnection() {
  const { trigger } = useSWRMutation("/connections", insertConnection, {
    populateCache: (connection, connections) => [...connections, connection],
  });

  return async (connection: PartialConnection) => {
    await trigger(connection, {
      optimisticData: (connections) => [...connections, connection],
    });
  };
}

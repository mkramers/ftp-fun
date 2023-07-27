import useSWR from "swr";
import { ConnectionWithId } from "@/app/types/Connection";

async function listDirectory(
  key: string,
  connectionId: number,
  directory: string,
) {
  const data = {
    connectionId: connectionId.toString(),
    directory,
  };

  const searchParams = new URLSearchParams(data);

  const url = `${key}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (response.status !== 200) {
    console.warn(
      `Failed to list connections with status code: ${response.status}}`,
    );
    return [];
  }

  const body = await response.json();
  return body;
}

export function useListConnectionDirectory(
  connection: ConnectionWithId,
  directory: string,
) {
  return useSWR(
    ["/connections/list", connection.id, directory],
    ([url, connectionId, directory]) =>
      listDirectory(url, connectionId, directory),
    {
      revalidateOnFocus: false,
    },
  );
}

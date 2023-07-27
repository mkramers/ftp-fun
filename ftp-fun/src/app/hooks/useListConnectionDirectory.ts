import useSWR from "swr";

async function listDirectory(connectionId: number, directory: string) {
  const url = `/connections/list?connectionId=${connectionId}&directory=${directory}`;

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
  connectionId: number,
  directory: string,
) {
  return useSWR("/connections/list", listDirectory, {
    revalidateOnFocus: false,
  });
}

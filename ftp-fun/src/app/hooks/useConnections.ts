import { connectionSchema, ConnectionWithId } from "@/app/types/Connection";
import useSWR from "swr";
import { z } from "zod";

async function getConnections(url: string) {
  const response = await fetch(url);

  if (response.status !== 200) {
    console.warn(
      `Failed to get connections with status code: ${response.status}}`,
    );
    return [];
  }

  const body = await response.json();

  const parsed = z.array(connectionSchema).safeParse(body);
  if (!parsed.success) {
    throw new Error("Failed to parse connections", parsed.error);
  }

  const { data: connections } = parsed;

  return connections;
}

export function useConnections(initialConnections: ConnectionWithId[]) {
  const { data, error, isLoading } = useSWR("/connections", getConnections);

  if (error) {
    throw new Error("Failed to fetch connections");
  }

  if (isLoading) {
    return initialConnections;
  }

  return data;
}

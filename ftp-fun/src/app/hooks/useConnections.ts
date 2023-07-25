import { Connection, connectionSchema } from "@/app/types/Connection";
import useSWR from "swr";
import { z } from "zod";

async function getConnections(url: string) {
  const response = await fetch(url);
  return await response.json();
}

export function useConnections(initialConnections: Connection[]) {
  const { data, error, isLoading } = useSWR("/connections", getConnections);

  if (error) {
    throw new Error("Failed to fetch connections");
  }

  if (isLoading) {
    return initialConnections;
  }

  const connectionsSchema = z.array(connectionSchema);

  const parsed = connectionsSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Failed to parse connections", parsed.error);
  }

  const { data: connections } = parsed;

  return connections;
}

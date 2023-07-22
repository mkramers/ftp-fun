import { Connection, connectionSchema } from "@/app/types/Connection";
import useSWRMutation from "swr/mutation";
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
      optimisticData: (connections) => [...connections, connection],
    });
  };
}

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

const verifyConnection = async (
  url: string,
  { arg }: { arg: { id: number } },
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((response) => response.json());

export function useVerifyConnection() {
  const { trigger } = useSWRMutation("/connections/verify", verifyConnection, {
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

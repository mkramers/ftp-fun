import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
} from "react";
import {
  Connection as ConnectionType,
  Connection,
  tryParseConnection,
} from "@/app/types/Connection";
import useSWRMutation from "swr/mutation";

type ConnectionContext = {
  connections: Connection[];
  setConnections: Dispatch<SetStateAction<Connection[]>>;
};

const Context = createContext<ConnectionContext>({
  get connections(): never {
    throw new Error("No connection context provider");
  },
  get setConnections(): never {
    throw new Error("No connection context provider");
  },
});

interface Props {
  connections: Connection[];
  setConnections: Dispatch<SetStateAction<Connection[]>>;
}

export function ConnectionContextProvider({
  connections,
  setConnections,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Context.Provider value={{ connections, setConnections }}>
      {children}
    </Context.Provider>
  );
}

export function useConnections() {
  const { connections } = useContext(Context);
  return connections;
}

async function insertConnection(
  url: string,
  { arg: connection }: { arg: ConnectionType },
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(connection),
  });

  const body = await response.json();

  return tryParseConnection(body?.connection);
}

export function useInsertConnection() {
  const { setConnections } = useContext(Context);
  const { trigger } = useSWRMutation("/connections", insertConnection);

  return async (connection: Connection) => {
    const newConnection = await trigger(connection);
    if (!newConnection) {
      throw new Error("Failed to insert/parse connections");
    }

    setConnections((connections) => [...connections, newConnection]);
  };
}

async function updateConnection(
  url: string,
  { arg: connection }: { arg: ConnectionType },
) {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(connection),
  });

  const body = await response.json();

  return tryParseConnection(body?.connection);
}

export function useUpdateConnection() {
  const { setConnections } = useContext(Context);
  const { trigger: triggerEdit } = useSWRMutation(
    "/connections",
    updateConnection,
  );

  return async (connection: Connection) => {
    const editedConnection = await triggerEdit(connection);
    if (!editedConnection) {
      throw new Error("Failed to edit/parse connections");
    }

    setConnections((connections) =>
      connections.map((c) => (c.id === editedConnection.id ? connection : c)),
    );
  };
}

async function deleteConnection(url: string, { arg: id }: { arg: number }) {
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  const body = await response.json();
  return tryParseConnection(body?.connection);
}

export function useDeleteConnection() {
  const { setConnections } = useContext(Context);
  const { trigger } = useSWRMutation("/connections", deleteConnection);

  return async (id: number) => {
    const deletedConnection = await trigger(id);
    if (!deletedConnection) {
      throw new Error("Failed to delete/parse connections");
    }

    setConnections((connections) => connections.filter((c) => c.id !== id));
  };
}

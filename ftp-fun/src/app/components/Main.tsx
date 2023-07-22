"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { CreateConnection } from "@/app/components/CreateConnection";
import {
  Connection as ConnectionType,
  tryParseConnections,
} from "@/app/types/Connection";
import { Connection } from "@/app/components/Connection";
import { Button } from "@/app/components/Button/Button";
import useSWRMutation from "swr/mutation";

interface Props {
  connections: ConnectionType[];
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

  return tryParseConnections(body?.connections);
}

async function deleteConnection(
  url: string,
  { arg: connection }: { arg: ConnectionType },
) {
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(connection),
  });

  const body = await response.json();

  return tryParseConnections(body?.connections);
}

async function editConnection(
  url: string,
  { arg: connection }: { arg: ConnectionType },
) {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(connection),
  });

  const body = await response.json();

  return tryParseConnections(body?.connections);
}

export function Main({ connections }: Props) {
  const [allConnections, setAllConnections] = useState(connections);

  const [editingConnection, setEditingConnection] = useState<
    ConnectionType | undefined
  >(undefined);

  const [createIsDialogOpen, setCreateIsDialogOpen] = useState(false);

  const [editIsDialogOpen, setEditIsDialogOpen] = useState(false);

  useEffect(() => {
    setAllConnections(connections);
  }, [connections]);

  const { trigger: triggerInsert } = useSWRMutation(
    "/connections",
    insertConnection,
    {
      optimisticData: [connections],
    },
  );

  const { trigger: triggerDelete } = useSWRMutation(
    "/connections",
    deleteConnection,
    {
      optimisticData: [connections],
    },
  );

  const { trigger: triggerEdit } = useSWRMutation(
    "/connections",
    editConnection,
    {
      optimisticData: [connections],
    },
  );

  const handleCreateConnectionClicked = () => {
    setCreateIsDialogOpen(true);
  };

  const handleCreateConnection = async (connection: ConnectionType) => {
    const newConnections = await triggerInsert(connection);
    if (!newConnections) {
      throw new Error("Failed to insert/parse connections");
    }

    setAllConnections((connections) => [...connections, ...newConnections]);
    setCreateIsDialogOpen(false);
  };

  const handleOnEditConnection = async (connection: ConnectionType) => {
    setEditingConnection(connection);
    setEditIsDialogOpen(true);
  };

  const handleConnectionEdited = async (connection: ConnectionType) => {
    const editedConnections = await triggerEdit(connection);
    if (!editedConnections) {
      throw new Error("Failed to edit/parse connections");
    }

    setAllConnections((connections) =>
      connections.map((c) => (c.id === connection.id ? connection : c)),
    );
    setEditingConnection(undefined);
    setEditIsDialogOpen(false);
  };

  const handleDeleteConnection = async (connection: ConnectionType) => {
    const deletedConnections = await triggerDelete(connection);
    if (!deletedConnections) {
      throw new Error("Failed to delete/parse connections");
    }

    setAllConnections((connections) =>
      connections.filter((c) => c.id !== connection.id),
    );
  };

  const handleTestConnection = async (connection: ConnectionType) => {
    //
  };

  return (
    <>
      <Modal
        title={"Create Connection"}
        isOpen={createIsDialogOpen}
        setIsOpen={setCreateIsDialogOpen}
      >
        <CreateConnection onChanged={handleCreateConnection} />
      </Modal>
      <Modal
        title={"Edit Connection"}
        isOpen={editIsDialogOpen}
        setIsOpen={setEditIsDialogOpen}
      >
        <CreateConnection
          onChanged={handleConnectionEdited}
          connection={editingConnection}
        />
      </Modal>
      <main className="flex min-h-screen flex-col items-center p-24 w-full">
        <p>Hello.</p>
        <div className={"flex flex-col gap-2 w-1/2"}>
          {allConnections.map((connection, index) => (
            <Connection
              key={index}
              connection={connection}
              onDelete={handleDeleteConnection}
              onEdit={handleOnEditConnection}
              onTest={handleTestConnection}
            />
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={handleCreateConnectionClicked}>
            Create Connection
          </Button>
        </div>
      </main>
    </>
  );
}

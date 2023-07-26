"use client";

import React, { useState } from "react";
import {
  Connection as ConnectionType,
  PartialConnection,
} from "@/app/types/Connection";
import Modal from "@/app/components/Modal/Modal";
import { CreateConnection } from "@/app/components/CreateConnection";
import { Connection } from "@/app/components/Connection";
import { Button } from "@/app/components/Button/Button";
import { useConnections } from "@/app/hooks/useConnections";
import { useInsertConnection } from "@/app/hooks/useInsertConnection";
import { useUpdateConnection } from "@/app/hooks/useUpdateConnection";
import { useDeleteConnection } from "@/app/hooks/useDeleteConnection";
import { useVerifyConnection } from "@/app/hooks/useVerifyConnection";

const defaultNewConnection: PartialConnection = {
  port: 22,
  hostname: "test",
  username: "user",
  password: "password",
  verified: false,
};

interface Props {
  initialConnections: ConnectionType[];
}

export function Home({ initialConnections }: Props) {
  const connections = useConnections(initialConnections);

  const insertConnection = useInsertConnection();
  const updateConnection = useUpdateConnection();
  const deleteConnection = useDeleteConnection();
  const verifyConnection = useVerifyConnection();

  const [selectedConnection, setSelectedConnection] = useState<
    ConnectionType | undefined
  >(undefined);

  const [newConnection, setNewConnection] =
    useState<PartialConnection>(defaultNewConnection);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCreateConnectionClicked = () => {
    setNewConnection(defaultNewConnection);
    setIsCreateDialogOpen(true);
  };

  const handleEditConnectionClicked = async (connection: ConnectionType) => {
    setSelectedConnection(connection);
    setIsEditDialogOpen(true);
  };

  const handleCreateConnection = async (connection: PartialConnection) => {
    setIsCreateDialogOpen(false);
    setSelectedConnection(undefined);

    await insertConnection(connection);
  };

  const handleUpdateConnection = async (connection: ConnectionType) => {
    setIsEditDialogOpen(false);
    setSelectedConnection(undefined);

    if (connection.id === undefined) {
      return;
    }

    await updateConnection(connection as ConnectionType);
  };

  const handleDeleteConnection = async (connection: ConnectionType) => {
    setSelectedConnection(undefined);

    await deleteConnection(connection.id);
  };

  const handleVerifyConnection = async (connection: PartialConnection) => {
    const verified = await verifyConnection(connection);

    const { id } = connection;

    const existingConnection = id !== undefined;
    if (!existingConnection) {
      setNewConnection({ ...connection, verified });
      return;
    }

    await updateConnection({ ...connection, id, verified });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <Modal
        title={"Create Connection"}
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
      >
        <CreateConnection
          connection={newConnection}
          onVerify={handleVerifyConnection}
          onConfirmed={handleCreateConnection}
        />
      </Modal>
      {selectedConnection && (
        <Modal
          title={"Edit Connection"}
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
        >
          <CreateConnection
            connection={selectedConnection}
            onVerify={handleVerifyConnection}
            onConfirmed={handleUpdateConnection}
          />
        </Modal>
      )}
      <p>Hello.</p>
      <div className={"flex flex-col gap-2 w-1/2"}>
        {connections.map((connection) => (
          <Connection
            key={connection.id}
            connection={connection}
            onDelete={handleDeleteConnection}
            onUpdate={handleEditConnectionClicked}
            onTest={handleVerifyConnection}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={handleCreateConnectionClicked}>
          Create Connection
        </Button>
      </div>
    </main>
  );
}

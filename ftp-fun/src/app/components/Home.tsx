"use client";

import React, { useState } from "react";
import {
  Connection as ConnectionType,
  ConnectionWithId,
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

const defaultNewConnection: ConnectionType = {
  port: 22,
  hostname: "test",
  username: "user",
  password: "password",
  verified: false,
};

interface Props {
  initialConnections: ConnectionWithId[];
}

export function Home({ initialConnections }: Props) {
  const connections = useConnections(initialConnections);

  const insertConnection = useInsertConnection();
  const updateConnection = useUpdateConnection();
  const deleteConnection = useDeleteConnection();
  const verifyConnection = useVerifyConnection();

  const [selectedConnection, setSelectedConnection] = useState<
    ConnectionWithId | undefined
  >(undefined);

  const [newConnection, setNewConnection] = useState(defaultNewConnection);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCreateConnectionClicked = () => {
    setNewConnection(defaultNewConnection);
    setIsCreateDialogOpen(true);
  };

  const handleEditConnectionClicked = async (connection: ConnectionWithId) => {
    setSelectedConnection(connection);
    setIsEditDialogOpen(true);
  };

  const handleCreateConnection = async (connection: ConnectionType) => {
    setIsCreateDialogOpen(false);
    setSelectedConnection(undefined);

    await insertConnection(connection);
  };

  const handleUpdateConnection = async (connection: ConnectionWithId) => {
    setIsEditDialogOpen(false);
    setSelectedConnection(undefined);

    if (connection.id === undefined) {
      return;
    }

    await updateConnection(connection as ConnectionWithId);
  };

  const handleDeleteConnection = async (connection: ConnectionWithId) => {
    setSelectedConnection(undefined);

    await deleteConnection(connection.id);
  };

  const handleVerifyNewConnection = async (connection: ConnectionType) => {
    const verified = await verifyConnection(connection);

    setNewConnection({ ...connection, verified });
  };

  const handleVerifyExistingConnection = async (
    connection: ConnectionWithId,
  ) => {
    const verified = await verifyConnection(connection);

    setSelectedConnection({ ...connection, verified });
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
          onVerify={handleVerifyNewConnection}
          // onChanged={setNewConnection}
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
            onVerify={handleVerifyExistingConnection}
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
            onTest={handleVerifyExistingConnection}
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

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

interface Props {
  initialConnections: ConnectionType[];
}

export function Home({ initialConnections }: Props) {
  const connections = useConnections(initialConnections);
  const insertConnection = useInsertConnection();
  const updateConnection = useUpdateConnection();
  const deleteConnection = useDeleteConnection();

  const [selectedConnection, setSelectedConnection] = useState<
    ConnectionType | undefined
  >(undefined);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCreateConnectionClicked = () => {
    setSelectedConnection(undefined);
    setIsCreateDialogOpen(true);
  };

  const handleEditConnectionClicked = async (connection: ConnectionType) => {
    setSelectedConnection(connection);
    setIsEditDialogOpen(true);
  };

  const handleCreateConnection = async (connection: PartialConnection) => {
    setIsCreateDialogOpen(false);

    await insertConnection(connection);
  };

  const handleUpdateConnection = async (connection: PartialConnection) => {
    setSelectedConnection(undefined);
    setIsEditDialogOpen(false);

    if (connection.id === undefined || connection.verified === undefined) {
      return;
    }

    await updateConnection(connection as ConnectionType);
  };

  const handleDeleteConnection = async (connection: ConnectionType) => {
    setSelectedConnection(undefined);

    await deleteConnection(connection.id);
  };

  const handleTestConnection = async (connection: ConnectionType) => {
    //
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <Modal
        title={"Create Connection"}
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
      >
        <CreateConnection
          onChanged={handleCreateConnection}
          connection={{
            id: 0,
            port: 22,
            hostname: "test",
            username: "user",
            password: "password",
            verified: false,
          }}
        />
      </Modal>
      <Modal
        title={"Edit Connection"}
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      >
        <CreateConnection
          onChanged={handleUpdateConnection}
          connection={selectedConnection}
        />
      </Modal>
      <p>Hello.</p>
      <div className={"flex flex-col gap-2 w-1/2"}>
        {connections.map((connection) => (
          <Connection
            key={connection.id}
            connection={connection}
            onDelete={handleDeleteConnection}
            onUpdate={handleEditConnectionClicked}
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
  );
}

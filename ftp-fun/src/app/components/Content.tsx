"use client";

import React, { useState } from "react";
import { Connection as ConnectionType } from "@/app/types/Connection";
import Modal from "@/app/components/Modal/Modal";
import { CreateConnection } from "@/app/components/CreateConnection";
import { Connection } from "@/app/components/Connection";
import { Button } from "@/app/components/Button/Button";
import {
  useConnections,
  useDeleteConnection,
  useEditConnection,
  useInsertConnection,
} from "@/app/context/ConnectionContextProvider";

export function Content() {
  const connections = useConnections();
  const insertConnection = useInsertConnection();
  const editConnection = useEditConnection();
  const deleteConnection = useDeleteConnection();

  const [editingConnection, setEditingConnection] = useState<
    ConnectionType | undefined
  >(undefined);

  const [createIsDialogOpen, setCreateIsDialogOpen] = useState(false);

  const [editIsDialogOpen, setEditIsDialogOpen] = useState(false);

  const handleCreateConnectionClicked = () => {
    setCreateIsDialogOpen(true);
  };

  const handleOnEditConnection = async (connection: ConnectionType) => {
    setEditingConnection(connection);
    setEditIsDialogOpen(true);
  };

  const handleCreateConnection = async (connection: ConnectionType) => {
    await insertConnection(connection);

    setCreateIsDialogOpen(false);
  };

  const handleConnectionEdited = async (connection: ConnectionType) => {
    await editConnection(connection);

    setEditingConnection(undefined);
    setEditIsDialogOpen(false);
  };

  const handleDeleteConnection = async (connection: ConnectionType) => {
    await deleteConnection(connection.id);
  };

  const handleTestConnection = async (connection: ConnectionType) => {
    //
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
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
      <p>Hello.</p>
      <div className={"flex flex-col gap-2 w-1/2"}>
        {connections.map((connection) => (
          <Connection
            key={connection.id}
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
  );
}

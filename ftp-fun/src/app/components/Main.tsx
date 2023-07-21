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

export function Main({ connections }: Props) {
  const [allConnections, setAllConnections] = useState(connections);

  const [createIsDialogOpen, setCreateIsDialogOpen] = useState(false);

  useEffect(() => {
    setAllConnections(connections);
  }, [connections]);

  const { trigger } = useSWRMutation("/connections", insertConnection, {
    optimisticData: [connections],
  });

  const handleCreateConnectionClicked = () => {
    setCreateIsDialogOpen(true);
  };

  const handleOnConnectionSubmitted = async (connection: ConnectionType) => {
    const newConnections = await trigger(connection);
    if (!newConnections) {
      throw new Error("Failed to insert/parse connections");
    }

    setAllConnections((connections) => [...connections, ...newConnections]);
    setCreateIsDialogOpen(false);
  };

  return (
    <>
      <Modal
        title={"Create Connection"}
        isOpen={createIsDialogOpen}
        setIsOpen={setCreateIsDialogOpen}
      >
        <CreateConnection onCreated={handleOnConnectionSubmitted} />
      </Modal>
      <main className="flex min-h-screen flex-col items-center p-24 w-full">
        <p>Hello.</p>
        <div className={"flex flex-col gap-2 w-1/2"}>
          {allConnections.map((connection, index) => (
            <Connection connection={connection} key={index} />
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

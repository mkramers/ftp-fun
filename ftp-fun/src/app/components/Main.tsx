"use client";

import React, { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { CreateConnection } from "@/app/components/CreateConnection";
import { Connection as ConnectionType } from "@/app/types/Connection";
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
  console.log("connection", connection);
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(connection),
  });
}

export function Main({ connections }: Props) {
  const [createIsDialogOpen, setCreateIsDialogOpen] = useState(false);

  const { trigger } = useSWRMutation("/connections", insertConnection, {
    optimisticData: [connections],
  });

  const handleCreateConnectionClicked = () => {
    setCreateIsDialogOpen(true);
  };

  const handleOnConnectionSubmitted = async (connection: ConnectionType) => {
    await trigger(connection);
    setCreateIsDialogOpen(false);
  };

  return (
    <>
      <Modal
        title={"Create Connection"}
        isOpen={createIsDialogOpen}
        setIsOpen={setCreateIsDialogOpen}
      >
        <CreateConnection onSubmitted={handleOnConnectionSubmitted} />
      </Modal>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <p>Hello.</p>
          {connections.map((connection, index) => (
            <Connection connection={connection} key={index} />
          ))}
          <div className="mt-4">
            <Button onClick={handleCreateConnectionClicked}>
              Create Connection
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

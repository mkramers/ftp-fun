import { ConnectionWithId as ConnectionType } from "@/app/types/Connection";
import React from "react";
import { Label } from "@/app/components/Label/Label";
import { Button } from "@/app/components/Button/Button";

interface Props {
  connection: ConnectionType;
  onDelete: (connection: ConnectionType) => void;
  onUpdate: (connection: ConnectionType) => void;
  onTest: (connection: ConnectionType) => void;
}

export function Connection({ connection, onDelete, onUpdate, onTest }: Props) {
  return (
    <div
      className={
        "p-3 flex flex-col rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
      }
      key={connection.id}
    >
      <Label title={"Hostname"} value={connection.hostname} />
      <Label title={"Port"} value={connection.port} />
      <Label title={"Username"} value={connection.username} />
      <div className={"flex flex-row justify-center gap-2"}>
        <Button onClick={() => onUpdate(connection)}>Edit</Button>
        <Button onClick={() => onTest(connection)}>Test</Button>
        <Button onClick={() => onDelete(connection)}>Delete</Button>
      </div>
    </div>
  );
}

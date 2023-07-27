import { ConnectionWithId as ConnectionType } from "@/app/types/Connection";
import React, { useState } from "react";
import { Label } from "@/app/components/Label/Label";
import { Button } from "@/app/components/Button/Button";
import { DirectoryList } from "@/app/components/DirectoryList";

interface Props {
  connection: ConnectionType;
  onDelete: (connection: ConnectionType) => void;
  onUpdate: (connection: ConnectionType) => void;
  onVerify: (connection: ConnectionType) => void;
}

export function Connection({
  connection,
  onDelete,
  onUpdate,
  onVerify,
}: Props) {
  const [isViewing, setIsViewing] = useState(false);

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
        <Button onClick={() => onVerify(connection)}>Test</Button>
        <Button onClick={() => onDelete(connection)}>Delete</Button>
        <Button onClick={() => setIsViewing((viewing) => !viewing)}>
          List
        </Button>
      </div>
      {isViewing && (
        <DirectoryList
          connection={connection}
          directory={"/home3/deathman666"}
        />
      )}
    </div>
  );
}

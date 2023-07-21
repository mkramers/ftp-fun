import { Connection as ConnectionType } from "@/app/types/Connection";
import React from "react";
import { Label } from "@/app/components/Label/Label";

interface Props {
  connection: ConnectionType;
}

export function Connection({ connection }: Props) {
  return (
    <div
      className={
        "p-3 flex flex-col rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
      }
      key={connection.id}
    >
      <Label title={"ID"} value={connection.id ?? "N/A"} />
      <Label title={"Hostname"} value={connection.hostname} />
      <Label title={"Port"} value={connection.port} />
      <Label title={"Username"} value={connection.username} />
    </div>
  );
}

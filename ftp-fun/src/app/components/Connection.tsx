import { Connection as ConnectionType } from "../types/Connection";
import React from "react";

interface Props {
  connection: ConnectionType;
}
export function Connection({ connection }: Props) {
  return (
    <div key={connection.id}>
      <p>
        {connection.hostname}:{connection.port}
      </p>
      <p>{connection.username}</p>
      <p>{connection.password}</p>
    </div>
  );
}

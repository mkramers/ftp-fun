"use client";

import React, { useEffect, useState } from "react";
import {
  Connection,
  Connection as ConnectionType,
} from "@/app/types/Connection";
import { ConnectionContextProvider } from "@/app/context/ConnectionContextProvider";
import { Content } from "@/app/components/Content";

interface Props {
  connections: ConnectionType[];
}

export function Main({ connections: fetchedConnections }: Props) {
  const [connections, setConnections] =
    useState<Connection[]>(fetchedConnections);

  useEffect(() => {
    setConnections(fetchedConnections);
  }, [fetchedConnections]);

  return (
    <ConnectionContextProvider
      connections={connections}
      setConnections={setConnections}
    >
      <Content connections={connections} />
    </ConnectionContextProvider>
  );
}

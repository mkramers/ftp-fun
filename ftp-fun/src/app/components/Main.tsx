"use client";

import React from "react";
import { Connection as ConnectionType } from "@/app/types/Connection";
import { ConnectionContextProvider } from "@/app/context/ConnectionContextProvider";
import { Content } from "@/app/components/Content";

interface Props {
  connections: ConnectionType[];
}

export function Main({ connections }: Props) {
  return (
    <ConnectionContextProvider>
      <Content connections={connections} />
    </ConnectionContextProvider>
  );
}

import React from "react";
import { Main } from "@/app/components/Main";
import { SWRProvider } from "@/app/SWRProvider";
import { getConnections } from "@/app/connections/db/utils";

export default async function Home() {
  const connections = await getConnections();
  if (!connections) {
    throw new Error("Failed to parse connections");
  }

  return (
    <SWRProvider>
      <Main connections={connections} />
    </SWRProvider>
  );
}

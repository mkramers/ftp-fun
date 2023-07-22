import React from "react";
import { Home } from "@/app/components/Home";
import { getConnections } from "@/app/connections/db/utils";

export default async function Page() {
  const connections = await getConnections();
  return <Home initialConnections={connections} />;
}

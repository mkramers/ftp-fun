import React from "react";
import { Home } from "@/app/components/Home";

import { getConnections } from "@/app/connections/db/queries/getConnections";

export default async function Page() {
  const connections = await getConnections();
  return <Home initialConnections={connections} />;
}

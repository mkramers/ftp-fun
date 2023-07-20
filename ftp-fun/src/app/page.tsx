import React from "react";
import { openSqlLiteDb } from "@/app/utils/db/openSqlLiteDb";
import { ConnectionDb } from "@/app/utils/db/ConnectionDb";
import { Main } from "@/app/components/Main";
import { Connection } from "@/app/types/Connection";

async function getData() {
  const db = await openSqlLiteDb("./db/db.sqlite3");
  const connectionDb = new ConnectionDb(db);
  return await connectionDb.getAll();
}

async function insertConnection(connection: Connection) {
  const db = await openSqlLiteDb("./db/db.sqlite3");
  const connectionDb = new ConnectionDb(db);
  await connectionDb.insert(connection);
}

export default async function Home() {
  const connections = await getData();

  return <Main connections={connections} />;
}

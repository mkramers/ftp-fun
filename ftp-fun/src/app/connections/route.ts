import { NextResponse } from "next/server";

import { Connection, tryParseConnection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";

type DbConnection = Omit<Connection, "verified"> & { verified: number };

function parseQueryResult(connection: Required<DbConnection>): Connection {
  return {
    ...connection,
    verified: connection.verified === 1,
  };
}

export async function getConnections() {
  const db = await getDb();

  const query = `SELECT * FROM connection;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query);
  return dbConnections.map(parseQueryResult);
}

export async function GET() {
  const connections = await getConnections();
  return NextResponse.json(connections);
}

export async function POST(request: Request) {
  const body = await request.json();
  const connection = tryParseConnection(body);
  if (!connection) {
    return NextResponse.json({ message: "Invalid connection" });
  }

  const db = await getDb();

  const query = `INSERT INTO connection (hostname, port, username, password) VALUES ($hostname, $port, $username, $password) RETURNING *;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query, {
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
  });

  const connections = dbConnections.map(parseQueryResult);

  return NextResponse.json({ connections });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const connection = tryParseConnection(body);
  if (!connection) {
    return NextResponse.json({ message: "Invalid connection" });
  }

  const db = await getDb();

  const query = `
UPDATE connection
SET hostname = $hostname,
    port = $port,
    username = $username,
    password = $password,
    verified = $verified
WHERE id = $id
RETURNING *;`;

  const dbConnections = await db.query<Required<DbConnection>[]>(query, {
    $id: connection.id,
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
    $verified: connection.verified ? 1 : 0,
  });

  const connections = dbConnections.map(parseQueryResult);

  return NextResponse.json({ connections });
}

import { NextResponse } from "next/server";

import { Connection, tryParseConnection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";
import { QueryParams } from "@/app/utils/db/SqlLiteDb";

export async function getConnections() {
  const db = await getDb();

  const query = `SELECT * FROM connection;`;

  return await db.query<Required<Connection>>(query);
}

function getConnectionQueryParams(
  connection: Connection,
): QueryParams<Connection> {
  return {
    $id: connection.id,
    $hostname: connection.hostname,
    $port: connection.port,
    $username: connection.username,
    $password: connection.password,
    $verified: connection.verified,
  };
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

  const params = getConnectionQueryParams(connection);

  const connections = await db.query<
    Required<Connection>[],
    QueryParams<Connection>
  >(query, params);

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

  const params = getConnectionQueryParams(connection);

  console.log("params", params);
  const connections = await db.query<
    Required<Connection>[],
    QueryParams<Connection>
  >(query, params);

  return NextResponse.json({ connections });
}

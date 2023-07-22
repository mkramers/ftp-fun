import { NextResponse } from "next/server";

import { Connection } from "@/app/types/Connection";
import { getDb } from "@/app/utils/db/db";
import { z } from "zod";
import { parseQueryResult } from "@/app/connections/route";

type DbConnection = Omit<Connection, "verified"> & { verified: number };

export async function getConnection(id: number) {
  const db = await getDb();

  const query = `SELECT * FROM connection WHERE id = $id;`;

  const dbConnection = await db.query<Required<DbConnection> | undefined>(
    query,
    {
      $id: id,
    },
  );

  if (!dbConnection) {
    return undefined;
  }

  return parseQueryResult(dbConnection);
}

export async function GET(request: Request) {
  const body = await request.json();

  const bodySchema = z.object({ id: z.number() });

  const { id } = bodySchema.parse(body);
  const connection = getConnection(id);
  if (!connection) {
    return NextResponse.json(
      { error: "Connection not found" },
      { status: 404 },
    );
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

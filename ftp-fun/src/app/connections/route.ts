import { NextResponse } from "next/server";

import { connectionSchema, tryParseConnection } from "@/app/types/Connection";
import {
  deleteConnection,
  getConnections,
  insertConnection,
  updateConnection,
} from "@/app/connections/db/utils";
import { z } from "zod";

export async function GET() {
  const connections = await getConnections();
  return NextResponse.json(connections);
}

export async function POST(request: Request) {
  const body = await request.json();
  const bodySchema = connectionSchema.partial({ id: true });

  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const { data: connection } = parsedBody;

  const connections = await insertConnection(connection);

  return NextResponse.json({ connections });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const bodySchema = connectionSchema.partial({ id: true });

  const connection = tryParseConnection(body);
  if (!connection) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const connections = await updateConnection(connection);

  return NextResponse.json({ connections });
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const parsedBody = z.object({ id: z.number() }).safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const { id } = parsedBody.data;

  const connections = await deleteConnection(id);

  return NextResponse.json({ connections });
}

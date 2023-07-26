import { NextResponse } from "next/server";

import {
  connectionSchema,
  tryParseConnectionWithId,
} from "@/app/types/Connection";
import { z } from "zod";
import { getConnections } from "@/app/connections/db/queries/getConnections";
import { updateConnection } from "@/app/connections/db/mutations/updateConnection";
import { deleteConnection } from "@/app/connections/db/mutations/deleteConnection";
import { insertConnection } from "@/app/connections/db/mutations/insertConnection";

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

  const newConnection = await insertConnection(connection);

  return NextResponse.json(newConnection);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const connection = tryParseConnectionWithId(body);
  if (!connection) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const updatedConnection = await updateConnection(connection);

  return NextResponse.json(updatedConnection);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const parsedBody = z.object({ id: z.number() }).safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const { id } = parsedBody.data;

  const connection = await deleteConnection(id);

  if (!connection) {
    return NextResponse.json(
      { message: "Connection doesn't exist" },
      { status: 204 },
    );
  }

  return NextResponse.json(connection);
}

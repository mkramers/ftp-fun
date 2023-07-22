import { NextResponse } from "next/server";
import { z } from "zod";
import { getConnection, updateConnection } from "@/app/connections/db/utils";

export async function GET(request: Request) {
  const body = await request.json();

  const parsedBody = z.object({ id: z.number() }).safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const { id } = parsedBody.data;

  const connection = await getConnection(id);
  if (!connection) {
    return NextResponse.json(
      { error: "Connection not found" },
      { status: 404 },
    );
  }

  // test connection
  const verified = true;

  const updatedConnection = await updateConnection({ ...connection, verified });
  if (!updatedConnection) {
    throw new Error("Error updating connection");
  }

  return NextResponse.json(updatedConnection);
}

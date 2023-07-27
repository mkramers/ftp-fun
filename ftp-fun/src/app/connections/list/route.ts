import { NextResponse } from "next/server";
import { tryConnect } from "@/app/utils/sftp/connect";
import { z } from "zod";
import { getConnection } from "@/app/connections/db/queries/getConnection";

export async function GET(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(urlParams);

  const parsed = z
    .object({ connectionId: z.number(), directory: z.string() })
    .safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request query" },
      { status: 422 },
    );
  }

  const {
    data: { connectionId, directory },
  } = parsed;

  const connection = await getConnection(connectionId);
  if (!connection) {
    return NextResponse.json(
      { error: `Connection ${connectionId} not found` },
      { status: 404 },
    );
  }

  const sftp = await tryConnect(connection);
  if (!sftp) {
    return NextResponse.json(
      { error: `Could not connect to server @ ${connection.hostname}` },
      { status: 500 },
    );
  }

  const data = await sftp.list(directory);

  return NextResponse.json({ data });
}

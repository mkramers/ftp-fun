import { NextResponse } from "next/server";
import { tryParseConnection } from "@/app/types/Connection";
import { tryConnect } from "@/app/utils/sftp/connect";

export async function GET(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(urlParams);

  const connection = tryParseConnection(params);
  if (!connection) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const sftp = await tryConnect(connection);
  const verified = !!sftp;

  return NextResponse.json({ verified });
}

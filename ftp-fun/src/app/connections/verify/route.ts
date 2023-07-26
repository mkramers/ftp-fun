import { NextResponse } from "next/server";
import { tryParseConnection } from "@/app/types/Connection";

export async function GET(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(urlParams);

  const connection = tryParseConnection(params);
  if (!connection) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  // todo: test connection
  const verified = true;

  return NextResponse.json({ verified });
}

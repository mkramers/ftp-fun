import { NextResponse } from "next/server";

import { tryParseConnection } from "@/app/types/Connection";

export async function GET() {
  return NextResponse.json({ message: "Hello world!" });
}

export async function POST(request: Request) {
  const body = await request.json();

  const connection = tryParseConnection(body);
  return NextResponse.json({ connection });
}

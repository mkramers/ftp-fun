import { Connection } from "@/app/types/Connection";
import Client from "ssh2-sftp-client";

export async function tryConnect(connection: Connection) {
  const sftp = new Client();

  let success = false;

  try {
    await sftp.connect(connection);
    success = true;
  } catch (err) {
    console.error("Error connecting to SFTP", err);
  }

  return success ? sftp : undefined;
}

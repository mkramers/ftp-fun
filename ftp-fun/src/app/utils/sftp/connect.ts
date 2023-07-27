import { Connection } from "@/app/types/Connection";
import { SFTPWrapper } from "ssh2";
import Client from "ssh2-sftp-client";

export async function tryConnect(connection: Connection) {
  const sftp = new Client();

  let sftpConnection: SFTPWrapper | undefined = undefined;
  try {
    sftpConnection = await sftp.connect(connection);
  } catch (err) {
    console.error("Error connecting to SFTP", err);
  }

  return sftpConnection;
}

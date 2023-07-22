import { z } from "zod";

export type Connection = {
  id: number;
  hostname: string;
  port: number;
  username: string;
  password: string;
  verified: boolean;
};

export const connectionSchema = z.object({
  id: z.number(),
  hostname: z.string(),
  port: z.number(),
  username: z.string(),
  password: z.string(),
  verified: z.boolean(),
});

const connectionsSchema = z.array(connectionSchema);

export function tryParseConnection(input: unknown): Connection | undefined {
  let connection: Connection;
  try {
    connection = connectionSchema.parse(input);
  } catch (error) {
    console.error(`Failed to parse connection: ${error}`);
    return undefined;
  }
  return connection;
}

export function tryParseConnections(input: unknown): Connection[] | undefined {
  let connections: Connection[];
  try {
    connections = connectionsSchema.parse(input);
  } catch (error) {
    console.error(`Failed to parse connection: ${error}`);
    return undefined;
  }
  return connections;
}

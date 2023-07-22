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

export function tryParseConnection(input: unknown): Connection | undefined {
  const parsedBody = connectionSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

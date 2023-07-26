import { z } from "zod";

export const connectionBaseSchema = z.object({
  hostname: z.string(),
  port: z.coerce.number(),
  username: z.string(),
  password: z.string(),
  verified: z.coerce.boolean(),
});

export const connectionSchema = connectionBaseSchema.extend({
  id: z.coerce.number(),
});

export const partialConnectionSchema = connectionSchema.partial({
  id: true,
});

export type ConnectionBase = z.infer<typeof connectionBaseSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type PartialConnection = z.infer<typeof partialConnectionSchema>;

export function tryParseConnectionBase(input: unknown) {
  const parsedBody = connectionBaseSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

export function tryParseConnection(input: unknown) {
  const parsedBody = connectionSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

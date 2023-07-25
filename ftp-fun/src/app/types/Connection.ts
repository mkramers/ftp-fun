import { z } from "zod";

export const connectionBaseSchema = z.object({
  hostname: z.string(),
  port: z.coerce.number(),
  username: z.string(),
  password: z.string(),
});

export const connectionSchema = connectionBaseSchema.extend({
  id: z.coerce.number(),
  verified: z.coerce.boolean(),
});

export type Connection = z.infer<typeof connectionSchema>;

export const partialConnectionSchema = connectionSchema.partial({
  id: true,
  verified: true,
});

export type ConnectionBase = z.infer<typeof connectionBaseSchema>;

export type PartialConnection = z.infer<typeof partialConnectionSchema>;

export function tryParseConnectionBase(input: unknown) {
  const parsedBody = connectionBaseSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

export function tryParseConnection(input: unknown) {
  const parsedBody = connectionSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

export function tryParsePartialConnection(input: unknown) {
  const parsedBody = partialConnectionSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

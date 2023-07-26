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

export type Connection = z.infer<typeof connectionBaseSchema>;
export type ConnectionWithId = z.infer<typeof connectionSchema>;

export function tryParseConnection(input: unknown) {
  const parsedBody = connectionBaseSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

export function tryParseConnectionWithId(input: unknown) {
  const parsedBody = connectionSchema.safeParse(input);
  return parsedBody.success ? parsedBody.data : undefined;
}

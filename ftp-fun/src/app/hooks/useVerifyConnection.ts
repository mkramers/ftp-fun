import { Connection } from "@/app/types/Connection";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const verifyConnection = async (key: string, { arg }: { arg: Connection }) => {
  const { hostname, port, username, password } = arg;
  const url = `${key}?hostname=${hostname}&port=${port}&username=${username}&password=${password}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    console.warn(
      `Failed to verify connection with status code: ${response.status}}`,
    );
    return undefined;
  }

  const body = await response.json();

  const parsedResult = z.object({ verified: z.boolean() }).safeParse(body);

  if (!parsedResult.success) {
    throw new Error("Failed to parse verify result");
  }

  return parsedResult.data.verified;
};

export function useVerifyConnection() {
  const { trigger } = useSWRMutation("/connections/verify", verifyConnection);

  return trigger;
}

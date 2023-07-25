import { ConnectionBase } from "@/app/types/Connection";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const verifyConnection = async (
  key: string,
  { arg }: { arg: ConnectionBase },
) => {
  const params = {
    ...arg,
    port: arg.port.toString(),
  };

  const searchParams = new URLSearchParams(params).toString();
  return fetch(key + "/?" + searchParams).then((response) => response.json());
};

export function useVerifyConnection() {
  const { trigger } = useSWRMutation("/connections/verify", verifyConnection);

  return async (connection: ConnectionBase) => {
    const result = await trigger(connection);

    const parsedResult = z.object({ verified: z.boolean() }).safeParse(result);

    if (!parsedResult.success) {
      throw new Error("Failed to parse verify result");
    }

    return parsedResult.data.verified;
  };
}

import { SubmitHandler, useForm } from "react-hook-form";
import { PartialConnection } from "@/app/types/Connection";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import React, { useEffect, useState } from "react";
import { useVerifyConnection } from "@/app/connections/hooks";

interface Props {
  connection?: PartialConnection;
  onChanged: (data: PartialConnection) => void;
}

export function CreateConnection({ connection, onChanged }: Props) {
  const [isVerified, setIsVerified] = useState(false);

  const verifyConnection = useVerifyConnection();

  useEffect(() => {
    setIsVerified(connection?.verified ?? false);
  }, [connection?.verified]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PartialConnection>({ defaultValues: connection });

  const onSubmit: SubmitHandler<PartialConnection> = (connection) => {
    const verified = connection.verified ?? false;
    onChanged({ ...connection, verified });
  };

  const handleTestConnection = async () => {
    const connection = getValues();
    const verified = await verifyConnection(connection);
    setIsVerified(verified);
  };

  return (
    <form
      className={"px-8 pt-6 pb-8 mb-4"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name={"hostname"}
        placeholder={"Host"}
        register={register}
        errors={errors}
      >
        Host:{" "}
      </Input>
      <Input
        name={"port"}
        placeholder={"Port"}
        type={"number"}
        register={register}
        options={{ valueAsNumber: true }}
        errors={errors}
      >
        Port:{" "}
      </Input>
      <Input
        name={"username"}
        placeholder={"Username"}
        register={register}
        errors={errors}
      >
        Username:{" "}
      </Input>
      <Input
        name={"password"}
        placeholder={"**********"}
        type={"password"}
        register={register}
        errors={errors}
      >
        Password:{" "}
      </Input>

      <div className={"flex flex-row justify-center gap-2"}>
        <Button onClick={handleTestConnection}>Test</Button>
        <Button disabled={!isVerified} type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
}

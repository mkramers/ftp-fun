import { DefaultValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { PartialConnection } from "@/app/types/Connection";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import React, { useEffect } from "react";

interface Props<T extends PartialConnection> {
  connection: T;
  onConfirmed: (connection: T) => void;
  onVerify: (connection: T) => void;
}

export function CreateConnection<T extends PartialConnection>({
  connection,
  onVerify,
  onConfirmed,
}: Props<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, defaultValues },
  } = useForm<T>({ defaultValues: connection as DefaultValues<T> });

  useEffect(() => {
    reset(connection);
  }, [connection, reset]);

  useEffect(() => {}, [defaultValues]);

  const onSubmit: SubmitHandler<T> = (connection) => {
    onConfirmed(connection);
  };

  const handleTestConnection = async () => {
    onVerify(connection);
  };

  return (
    <form
      className={"px-8 pt-6 pb-8 mb-4"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name={"hostname" as Path<T>}
        placeholder={"Host"}
        register={register}
        errors={errors}
      >
        Host:{" "}
      </Input>
      <Input
        name={"port" as Path<T>}
        placeholder={"Port"}
        type={"number"}
        register={register}
        options={{ valueAsNumber: true }}
        errors={errors}
      >
        Port:{" "}
      </Input>
      <Input
        name={"username" as Path<T>}
        placeholder={"Username"}
        register={register}
        errors={errors}
      >
        Username:{" "}
      </Input>
      <Input
        name={"password" as Path<T>}
        placeholder={"**********"}
        type={"password"}
        register={register}
        errors={errors}
      >
        Password:{" "}
      </Input>

      <div className={"flex flex-row justify-center gap-2"}>
        <Button onClick={handleTestConnection}>Test</Button>
        <Button disabled={!connection.verified} type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
}

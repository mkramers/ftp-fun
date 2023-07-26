import { DefaultValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { Connection } from "@/app/types/Connection";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import React, { useEffect } from "react";

interface Props<T extends Connection> {
  connection: T;
  onConfirmed: (connection: T) => void;
  onVerify: (connection: T) => void;
}

export function CreateConnection<T extends Connection>({
  connection,
  onVerify,
  onConfirmed,
}: Props<T>) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, defaultValues, isDirty, isValid },
  } = useForm<T>({ defaultValues: connection as DefaultValues<T> });

  useEffect(() => {
    reset(connection);
  }, [connection, reset]);

  const onSubmit: SubmitHandler<T> = (connection) => {
    onConfirmed(connection);
  };

  const handleTestConnection = async () => {
    const connection = getValues();
    onVerify(connection);
  };

  const canSubmit = !isDirty && connection.verified;

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
        <Button disabled={!canSubmit} type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
}

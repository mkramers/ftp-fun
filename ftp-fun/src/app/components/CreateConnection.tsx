import { SubmitHandler, useForm } from "react-hook-form";
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
  } = useForm<Connection>({ mode: "onTouched" });

  useEffect(() => {
    reset(connection);
  }, [connection, reset]);

  const onSubmit: SubmitHandler<Connection> = (newConnection) => {
    onConfirmed({ ...connection, ...newConnection });
  };

  const handleTestConnection = async () => {
    const newValues = getValues();
    onVerify({ ...connection, ...newValues });
  };

  const canVerify = isValid;
  const canSubmit = isValid && !isDirty && connection.verified;

  return (
    <form
      className={"px-8 pt-6 pb-8 mb-4"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id={"hostname"}
        placeholder={"Hostname"}
        hasError={!!errors.hostname}
        extraProps={register("hostname", { required: true })}
      >
        Hostname:{" "}
      </Input>
      <Input
        id={"port"}
        placeholder={"Port"}
        hasError={!!errors.port}
        extraProps={register("port", { required: true })}
      >
        Port:{" "}
      </Input>
      <Input
        id={"username"}
        placeholder={"Username"}
        hasError={!!errors.username}
        extraProps={register("username", { required: true })}
      >
        Username:{" "}
      </Input>
      <Input
        id={"password"}
        type={"password"}
        placeholder={"***************"}
        hasError={!!errors.password}
        extraProps={register("password", { required: true })}
      >
        Password:{" "}
      </Input>

      <div className={"flex flex-row justify-center gap-2"}>
        <Button disabled={!canVerify} onClick={handleTestConnection}>
          Test
        </Button>
        <Button disabled={!canSubmit} type={"submit"}>
          Submit
        </Button>
      </div>
    </form>
  );
}

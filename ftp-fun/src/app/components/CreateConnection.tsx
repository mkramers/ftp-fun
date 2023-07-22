import { SubmitHandler, useForm } from "react-hook-form";
import { Connection } from "@/app/types/Connection";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import { PartialBy } from "@/app/utils/types/PartialBy";

type FormConnection = PartialBy<Connection, "verified">;

interface Props {
  connection?: Connection;
  onChanged: (data: Connection) => void;
}

export function CreateConnection({ connection, onChanged }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormConnection>({ defaultValues: connection });

  const onSubmit: SubmitHandler<FormConnection> = (connection) => {
    const verified = connection.verified ?? false;
    onChanged({ ...connection, verified });
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

      <Button type={"submit"}>Submit</Button>
    </form>
  );
}

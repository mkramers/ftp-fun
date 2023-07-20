import { SubmitHandler, useForm } from "react-hook-form";
import { Connection } from "@/app/types/Connection";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";

interface Props {
  onSubmitted: (data: Connection) => void;
}

export function CreateConnection({ onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Connection>();
  const onSubmit: SubmitHandler<Connection> = (data) => {
    onSubmitted(data);
  };

  return (
    <form
      className={"px-8 pt-6 pb-8 mb-4"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name={"host"}
        placeholder={"Host"}
        register={register}
        errors={errors}
      >
        Host:{" "}
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

      <Button type={"submit"}>Create</Button>
    </form>
  );
}

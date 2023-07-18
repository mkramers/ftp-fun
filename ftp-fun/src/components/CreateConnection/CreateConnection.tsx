"use client";

import { Path, SubmitHandler, useForm } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

interface InputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  type?: "text" | "password";
}

function Input<TFieldValues extends FieldValues>({
  name,
  placeholder,
  errorMessage = "This field is required",
  register,
  errors,
  children,
  type = "text",
}: PropsWithChildren<InputProps<TFieldValues>>) {
  const hasError = !!errors[name];

  return (
    <div className={"mb-4"}>
      <label
        className={"block text-gray-700 text-sm font-bold mb-2"}
        htmlFor={name}
      >
        {children}
      </label>
      <input
        autoComplete={"false"}
        className={
          hasError
            ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        }
        placeholder={placeholder}
        type={type}
        id={name}
        {...register(name, { required: true })}
      />
      {hasError && (
        <p className={"text-red-500 text-xs italic"}>{errorMessage}</p>
      )}
    </div>
  );
}

type Inputs = {
  host: string;
  username: string;
  password: string;
};

export function CreateConnection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.back();
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

      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      />
    </form>
  );
}

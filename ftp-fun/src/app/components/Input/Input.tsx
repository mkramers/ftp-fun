import { FieldValues } from "react-hook-form/dist/types/fields";
import { Path } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { PropsWithChildren } from "react";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface InputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  type?: "text" | "password" | "number";
  options?: RegisterOptions<TFieldValues>;
}

export function Input<TFieldValues extends FieldValues>({
  name,
  placeholder,
  errorMessage = "This field is required",
  register,
  errors,
  children,
  type = "text",
  options,
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
        {...register(name, options)}
      />
      {hasError && (
        <p className={"text-red-500 text-xs italic"}>{errorMessage}</p>
      )}
    </div>
  );
}

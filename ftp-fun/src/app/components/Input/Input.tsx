import { InternalFieldName } from "react-hook-form/dist/types/fields";
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface InputProps<T extends InternalFieldName> {
  id: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  extraProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  children: ReactNode;
}

export function Input<T extends InternalFieldName>({
  id,
  type = "text",
  placeholder,
  hasError,
  errorMessage = "This field is required",
  extraProps,
  children,
}: InputProps<T>) {
  return (
    <div className={"mb-4"}>
      <label
        className={"block text-gray-700 text-sm font-bold mb-2"}
        htmlFor={id}
      >
        {children}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={"false"}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1 ${
          hasError ? "border-red-500" : ""
        }`}
        {...extraProps}
      />
      {hasError && (
        <p className={"text-red-500 text-xs italic"}>{errorMessage}</p>
      )}
    </div>
  );
}

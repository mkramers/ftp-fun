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
        autoComplete={"false"}
        className={
          hasError
            ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        }
        placeholder={placeholder}
        type={type}
        id={id}
        {...extraProps}
      />
      {hasError && (
        <p className={"text-red-500 text-xs italic"}>{errorMessage}</p>
      )}
    </div>
  );
}

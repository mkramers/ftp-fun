import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  onClick,
  type = "button",
  disabled,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

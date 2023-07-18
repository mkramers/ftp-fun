import { PropsWithChildren } from "react";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
}

export function Button({ onClick, children }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
}

export function LinkButton({
  href,
  children,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link href={href}>
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {children}
      </button>
    </Link>
  );
}

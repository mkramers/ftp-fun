import { PropsWithChildren } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button";

interface LinkButtonProps {
  href: string;
}

export function LinkButton({
  href,
  children,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  );
}

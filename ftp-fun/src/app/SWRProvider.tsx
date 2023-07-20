"use client";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const SWRProvider = ({ children }: Props) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

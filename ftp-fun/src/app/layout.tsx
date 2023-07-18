import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { PropsWithChildren, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ftp-fun",
  description: "A fun FTP client",
};

interface RootLayoutProps {
  modal: ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {modal}
      </body>
    </html>
  );
}

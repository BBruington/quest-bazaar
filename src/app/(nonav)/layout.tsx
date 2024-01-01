import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { TrpcProvider } from "../TrpcProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-foreground">{children}</body>
    </html>
  );
}

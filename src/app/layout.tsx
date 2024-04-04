import type { Metadata } from "next";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { TrpcProvider } from "./TrpcProvider";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Quest Bazaar",
  description: "Connect with friends to play DnD!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TrpcProvider>
        <html lang="en">
          <body className="bg-foreground">
            <Providers>
              {children}
            </Providers>
          </body>
        </html>
      </TrpcProvider>
    </ClerkProvider>
  );
}

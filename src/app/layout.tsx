import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import Navigation from "~/components/navigation";
import { TrpcProvider } from './TrpcProvider';
import "../styles/globals.css";


 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}


// here we wrap all of our pages with TrpcProvider to enable the client to invoke RPCs

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <TrpcProvider>
        <ClerkProvider>
          <html lang="en">
              <head>
              </head>
              <body>
                <Navigation></Navigation>
                {children}
              </body>
          </html>
        </ClerkProvider>
      </TrpcProvider>
  )
}
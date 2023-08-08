import type { AppProps } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'
import { type AppType } from "next/app";
import { api } from "../utils/api";
import "npm/styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

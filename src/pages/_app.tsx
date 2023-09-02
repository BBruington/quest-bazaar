import type { AppProps } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'
import { type AppType } from "next/app";
import { api } from "../utils/api";
import Navigation from "~/components/navigation";
import "../styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Navigation />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

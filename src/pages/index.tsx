import Head from "next/head";
import { rollDice } from "helpers/rollDice";
import { api } from "~/utils/api";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <button onClick={() => rollDice(1, 20)}>Roll d20</button>
        <UserButton />
      </main>
    </>
  );
}

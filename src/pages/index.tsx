import Head from "next/head";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  const queryUserByEmail = () => {
    console.log("data") 
  }
  

  return (
    <>
      <Head>
        <title>Quest Bazaar</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center space-y-3 justify-center ">
        <button onClick={queryUserByEmail}>look at user</button>
        {/* <CharacterCreation /> */}
        <UserButton />
      </main>
    </>
  );
}

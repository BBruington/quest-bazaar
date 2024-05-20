import Spinner from "~/components/spinner/spinner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quest Bazaar",
};

export default async function HomePage() {
  return (
    <>
      <div className="flex flex-col">
        <h1 className=" self-center text-4xl font-bold text-white">
          Find the Right Game For You
        </h1>
        <div className="mt-28">
          <Spinner />
        </div>
      </div>
    </>
  );
}

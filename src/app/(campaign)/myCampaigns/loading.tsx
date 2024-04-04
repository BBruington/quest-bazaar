import Spinner from "~/components/spinner/spinner";
import { Suspense } from "react";
import Link from "next/link";

export default async function MyCampaigns() {
  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold text-white">
        Your Current Games
      </h1>
      <div className="h-30 flex justify-around">
        <Link
          className="my-5 w-1/2 whitespace-nowrap rounded-md bg-blue-800 px-5 py-3 text-center text-white hover:bg-blue-700 md:w-1/6 lg:py-4"
          href={`/myCampaigns/create`}
        >
          Create New
        </Link>
      </div>
      <div className="mt-28">
        <Spinner />
      </div>
    </>
  );
}

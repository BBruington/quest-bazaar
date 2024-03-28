import type { Metadata } from "next";

import DisplayPosts from "~/app/(post)/post/_components/displayPosts";

export const metadata: Metadata = {
  title: "Quest Bazaar",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h1 className=" self-center text-4xl font-bold text-white">
        Find the Right Game For You
      </h1>
      <DisplayPosts />
    </div>
  );
}

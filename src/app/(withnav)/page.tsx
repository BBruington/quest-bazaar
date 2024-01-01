import type { Metadata } from "next";
import Navigation from "~/components/navigation";

import DisplayPosts from "~/components/post/displayPosts";

export const metadata: Metadata = {
  title: "Quest Bazaar",
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col">
        <h1 className=" self-center text-4xl font-bold text-white">
          Find the Right Game For You
        </h1>
        <DisplayPosts />
      </div>
    </>
  );
}

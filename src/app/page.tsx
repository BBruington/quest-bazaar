import type { Metadata } from "next";
import DisplayPosts from "~/components/post/displayPosts";

export const metadata: Metadata = {
  title: "Quest Bazaar",
};

export default function Page() {
  return <DisplayPosts />;
}

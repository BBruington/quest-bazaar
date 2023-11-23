import type { Metadata } from "next";
// import Home from "./home-page";
import CampaignPost from "~/components/post/Post";

export const metadata: Metadata = {
  title: "Quest Bazaar",
};

export default function Page() {
  return <CampaignPost />;
}

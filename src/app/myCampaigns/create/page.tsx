"use client";
import { useUser } from "@clerk/nextjs";
import CampaignCreator from "~/components/campaign/creator/createComponent";

export default function CreateCampaign() {
  const user = useUser()
  if (!user.user?.id || !user.user?.username) return <div>failed to load user...</div>
  return  <CampaignCreator userId={user.user.id} username={user.user.username} />
}

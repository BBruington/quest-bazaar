"use client";
import { useUser } from "@clerk/nextjs";
import CreateCampaignComponent from "../../../components/campaign/creator/createCampaign";

export default function CreateCampaign() {
  const user = useUser()
  if (!user.user?.id || !user.user?.username) return <div>failed to load user...</div>
  return  <CreateCampaignComponent userId={user.user.id} username={user.user.username} />
}

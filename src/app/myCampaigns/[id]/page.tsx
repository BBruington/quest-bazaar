"use client";
import CampaignComponent from "../../../components/campaign/campaign";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../utils/trpc";

export default function CampaignPage({ params }: { params: { id: string } }) {
  const user = useUser();
  const { data: campaignData } = api.queryCampaignData.useQuery({
    campaignId: params.id,
  });
  if (!user.user?.id)
    return (
      <div className="flex items-center justify-center text-white">
        <Loader2 className="h-32 w-32 animate-spin" />
      </div>
    );
  if (!campaignData)
    return (
      <div className="flex items-center justify-center text-white">
        <Loader2 className="h-32 w-32 animate-spin" />
      </div>
    );
  return (
    <CampaignComponent
      userId={user.user?.id}
      campaignData={campaignData}
      campaignPlayers={campaignData?.players ? campaignData.players : null}
    />
  );
}

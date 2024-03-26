"use client";
import CampaignComponent from "~/app/(campaign)/myCampaigns/_components/campaign";
import Spinner from "~//components/spinner/spinner";
import { useUser } from "@clerk/nextjs";
import { api } from "~//utils/trpc";

export default function CampaignPage({ params }: { params: { id: string } }) {
  const user = useUser();
  const { data: campaignData } = api.queryCampaignData.useQuery({
    campaignId: params.id,
  });
  if (!user.user?.id) return <Spinner />;
  if (!campaignData) return <Spinner />;
  return (
    <CampaignComponent
      userId={user.user?.id}
      campaignData={campaignData}
      campaignPlayers={campaignData?.players ? campaignData.players : null}
      campaignRequestingInvitePlayers={
        campaignData?.requestingInvitePlayers
          ? campaignData.requestingInvitePlayers
          : null
      }
    />
  );
}

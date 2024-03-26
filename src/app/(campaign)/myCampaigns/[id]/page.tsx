import { currentUser } from "@clerk/nextjs";
import CampaignComponent from "~/app/(campaign)/myCampaigns/[id]/_components/campaign";
import Spinner from "~//components/spinner/spinner";

export default async function CampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const campaignData = await prisma?.campaign.findUnique({
    where: {
      id: params.id,
    },
    include: {
      players: true,
      requestingInvitePlayers: true,
    },
  });
  const myNotes = await prisma?.campaignNote.findMany({
    where: {
      campaignId: params.id,
      userId: user?.id,
      private: true,
    },
  });
  if (!myNotes) return <Spinner />;
  if (!user) return <Spinner />;
  if (!campaignData) return <Spinner />;
  return (
    <CampaignComponent
      userId={user.id}
      campaignData={campaignData}
      myNotes={myNotes}
      campaignPlayers={campaignData?.players ? campaignData.players : null}
      campaignRequestingInvitePlayers={
        campaignData?.requestingInvitePlayers
          ? campaignData.requestingInvitePlayers
          : null
      }
    />
  );
}

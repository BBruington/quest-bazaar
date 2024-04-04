import { currentUser } from "@clerk/nextjs";
import CampaignComponent from "~/app/(campaign)/myCampaigns/[id]/_components/campaign";
import Spinner from "~//components/spinner/spinner";
import { prisma } from "~/utils/context";

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
      schedules: true,
      chat: true,
    },
  });
  const allNotes = await prisma?.campaignNote.findMany({
    where: {
      campaignId: params.id,
    },
  });

  if (!user || !allNotes || !campaignData) return <Spinner />;

  const myNotes = allNotes?.filter(
    (note) => note.private === true && note.userId === user?.id
  );
  const publicNotes = allNotes?.filter((note) => note.private === false);

  return (
    <CampaignComponent
      campaignMessages={campaignData.chat}
      userId={user.id}
      campaignData={campaignData}
      scheduledEvents={campaignData.schedules}
      myNotes={myNotes}
      publicNotes={publicNotes}
      campaignPlayers={campaignData?.players ? campaignData.players : null}
      campaignRequestingInvitePlayers={
        campaignData?.requestingInvitePlayers
          ? campaignData.requestingInvitePlayers
          : null
      }
    />
  );
}
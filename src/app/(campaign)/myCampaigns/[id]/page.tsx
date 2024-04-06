import { currentUser } from "@clerk/nextjs";
import CampaignComponent from "~/app/(campaign)/myCampaigns/[id]/_components/campaign";
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

  const campaignChat = await prisma.campaignChat.findMany({
    where: {
      campaignId: params.id
    },
    orderBy: { createdAt: "desc"}
  })
  const allNotes = await prisma?.campaignNote.findMany({
    where: {
      campaignId: params.id,
    },
  });

  const myNotes = allNotes?.filter(
    (note) => note.private === true && note.userId === user?.id
  );
  const publicNotes = allNotes?.filter((note) => note.private === false);
  if (!campaignData || ! user ) return <div>something went wrong</div>

  return (
    <CampaignComponent
      campaignMessages={campaignChat}
      userId={user?.id}
      campaignData={campaignData}
      scheduledEvents={campaignData?.schedules}
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

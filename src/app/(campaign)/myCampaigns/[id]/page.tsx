import { currentUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
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

  const post = await prisma.post.findFirst({
    where: {
      campaignId: params.id,
    },
  });

  const campaignChat = await prisma.campaignChat.findMany({
    where: {
      campaignId: params.id,
    },
    orderBy: { createdAt: "desc" },
  });
  const allNotes = await prisma?.campaignNote.findMany({
    where: {
      campaignId: params.id,
    },
  });

  const myNotes = allNotes?.filter(
    (note) => note.private === true && note.userId === user?.id
  );

  if (!campaignData || !user) return <div>something went wrong</div>;

  return (
    <>
      <Toaster position="top-center" />
      <CampaignComponent
        campaignMessages={campaignChat}
        userId={user?.id}
        campaignData={campaignData}
        scheduledEvents={campaignData?.schedules}
        myNotes={myNotes}
        allNotes={allNotes}
        campaignPlayers={campaignData?.players ? campaignData.players : null}
        campaignRequestingInvitePlayers={
          campaignData?.requestingInvitePlayers
            ? campaignData.requestingInvitePlayers
            : null
        }
        campaignPost={post}
      />
    </>
  );
}

import { currentUser } from "@clerk/nextjs";
import { prisma } from "~/utils/context";
import CreateCampaignForm from "./_components/create-campaign-form";

export default async function CreateCampaign() {
  const userData = await currentUser();
  
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userData?.id
    }
  })
  if (!userData?.id || !userData?.username || !user) return <div>failed to load user...</div>;


  

  const friendsList = await prisma.friendship.findMany({
    where: {
      OR: [
        {
          receiverId: user?.clerkId,
        },
        {
          senderId: user?.clerkId,
        },
      ],
      AND: [
        {
          status: "ACCEPTED",
        },
      ],
    },
  });
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <CreateCampaignForm friendsList={friendsList} user={user}/>
    </div>
  );
}

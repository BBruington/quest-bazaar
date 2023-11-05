import { prisma } from "~/utils/context";
import CampaignComponent from "~/components/campaign/campaign";

export default async function CampaignPage({ params }: {
  params: { id: string; };
}) {

  const campaignData = await prisma.campaign.findUnique({
    where: {
      id: params.id
    },
    include: {
      players: true
    }
  })

  if( !campaignData ) return <div>Unable to fetch campaign</div>
  return (
    <CampaignComponent campaignData={campaignData} campaignPlayers={campaignData.players} />
  )
}
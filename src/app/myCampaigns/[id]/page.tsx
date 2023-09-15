import { prisma } from "~/utils/context";
import CampaignComponent from "~/components/campaign";
import NotesPage from "~/components/notes/notes";

export default async function CampaignPage({ params }: {
  params: { id: string; };
}) {

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: params.id
    },
    include: {
      dmNotes: true,
    }
  })

  if( !campaign ) return <div>Unable to fetch campaign</div>

  return (
  <>
    <CampaignComponent campaignData={campaign}/>
    <NotesPage campaignNotes={campaign.dmNotes}/>
  </>
  )
}
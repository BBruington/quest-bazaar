import { prisma } from "~/utils/context";

export default async function Campaign({ params }: {
  params: { id: string; };
}) {

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: params.id
    },
    select: {
      id: true,
      name: true,
      description: true,
      dmUserId: true,
    }
  })

  if( !campaign ) return <div>Unable to fetch campaign</div>

  return (
  <>
    <div>{campaign.name}</div>
  </>
  )
}
import { prisma } from "~/utils/context";

export default function Campaign() {


  return (
  <>
    <div></div>
  </>
  )
}

export const getStaticPaths = async () => {
  const campaignsData =  await prisma.campaign.findMany();

  const paths = campaignsData.map((campaign) => ({
    params: {
      id: campaign.id
    },
  }))

  return({
    paths,
    fallback: false,
  })
}
// export const getStaticProps: GetStaticProps = async ({params}) => {
  
//   if (!params || typeof params.id !== 'string') {
//     return {
//       notFound: true,
//     };
//   }

//   const campaignData = await prisma.campaign.findUnique({
//     where: {
//       id: params.id
//     },
//     select: {
//       id: true,
//       name: true,
//       description: true,
//       dmUserId: true,
//     }
//   })
//   if ( campaignData === null) {
//     return({
//       notFound: true
//     })
//   }

//   return {
//     props: {
//       campaignData
//     }
//   }
// }
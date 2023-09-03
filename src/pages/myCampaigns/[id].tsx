import { prisma } from "~/server/db";
import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetServerSidePropsType
} from 'next'

export default function Campaign({campaignData}: InferGetServerSidePropsType<typeof getStaticProps>) {

  console.log(campaignData.name)

  return (
  <>
    <div>{campaignData.name}</div>
  </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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
export const getStaticProps: GetStaticProps = async ({params}) => {
  
  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const campaignData = await prisma.campaign.findUnique({
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
  console.log(campaignData)

  return {
    props: {
      campaignData
    }
  }
}
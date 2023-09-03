import { GetStaticProps } from "next";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";

export default function Campaign() {

  return (
  <>
    
  </>
  )
}

export const getStaticPaths = async () => {
  const campaignsData =  await prisma.campaign.findMany();

  const paths = campaignsData.map((campaign) => ({
    params: {
      id: campaign.id
    }
  }))

  return({
    paths,
    fallback: 'blocking',
  })
}
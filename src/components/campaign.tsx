'use client'
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Campaign } from "@prisma/client";

export default function CampaignComponent(props: {campaignData: Campaign}) {
  const {campaignData} = props
  const router = useRouter()
  const [campaign, setCampaign] = useState(campaignData)
  console.log(campaignData)
  console.log(campaignData.name)
  console.log("campaign", campaign)
  console.log(campaign.name)

  const { mutate } = api.deleteCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`)
    },
    onError: (e) => {
      console.error(e)
    }
  })
  return (
    <div className="flex space-x-3">
      <div>{campaign.name}</div>
      <div>{campaign.description}</div>
      <button onClick={(e) => {
        e.preventDefault();
        mutate({
          id: campaignData.id
        })
      }}>Delete Campaign</button>
  </div>
  )
}
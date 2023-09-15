'use client'
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Campaign } from "@prisma/client";

export default function CampaignComponent(props: {campaignData: Campaign}) {
  const {campaignData} = props;
  const router = useRouter();
  const user = useUser();
  const [campaign, setCampaign] = useState(campaignData)

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
      <Button variant="destructive" onClick={(e) => {
        e.preventDefault();
        mutate({
          id: campaignData.id
        })
      }}>Delete Campaign</Button>
  </div>
  )
}
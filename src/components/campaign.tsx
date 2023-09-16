'use client'
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Campaign } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"


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
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" >Delete Campaign</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your campaign
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {
              e.preventDefault();
              mutate({
                id: campaignData.id
              })
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  </div>
  )
}
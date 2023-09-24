'use client'
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Campaign } from "@prisma/client";

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, } from "./ui/accordion";
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
      <div className="w-1/6 mx-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Notes</AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Players</AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Posts</AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Campaign</AccordionTrigger>
            <AccordionContent>

              <div className="space-y-3">            
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

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  </div>
  )
}
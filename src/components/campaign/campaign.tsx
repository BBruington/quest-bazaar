"use client";
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "../ui/button";
import type { Campaign, CampaignNote, User } from "@prisma/client";
import NotesPage from "~/components/notes/notes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
} from "../ui/alert-dialog";

export default function CampaignComponent(props: {
  campaignData: Campaign;
  campaignNotes: CampaignNote[];
  campaignPlayers: User[];
}) {
  const { campaignData, campaignNotes, campaignPlayers } = props;
  const router = useRouter();
  const user = useUser();
  const [uiToggle, setUiToggle] = useState({
    editNotes: false,
  });

  const { mutate } = api.deleteCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return (
    <div className="flex space-x-3">
      <div className="mx-2 w-1/6">
        <Accordion type="single" collapsible className="ml-2 w-full">
          <AccordionItem value="item-1">
            <button
              className="py-3 text-white hover:underline"
              onClick={() =>
                setUiToggle({
                  editNotes: true,
                })
              }
            >
              Notes
            </button>
            {/* <AccordionTrigger>Notes</AccordionTrigger> */}
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Players</AccordionTrigger>
            <AccordionContent>
              {campaignPlayers.map((player) => (
                <div key={player.id}>{player.username}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Posts</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Campaign</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive" className="h-8">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your campaign and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          mutate({
                            id: campaignData.id,
                          });
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {uiToggle.editNotes && (
        <div className="w-full">
          <NotesPage
            campaignNotes={campaignNotes}
            campaignData={campaignData}
          />
        </div>
      )}
    </div>
  );
}

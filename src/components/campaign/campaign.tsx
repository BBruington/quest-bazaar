"use client";
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import CampaignChat from "./chat/chat";
import CalendarComponent from "./calendar/calendar";
import NotesPage from "~/components/campaign/notes/notes";
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
import type { Campaign, Players} from "./types"

export default function CampaignComponent(props: {
  campaignData: Campaign;
  campaignPlayers: Players[] | null | undefined;
  userId: string;
}) {
  const { campaignData, campaignPlayers, userId } = props;
  const [showPublicNotes, setShowPublicNotes] = useState(false);
  const [uiToggle, setUiToggle] = useState({
    editNotes: false,
    posts: false,
    schedules: false,
    chat: true,
  });
  const router = useRouter();
  const { data: campaignNotes, isLoading } =
    api.queryCampaignNotes.useQuery({
      campaignId: campaignData.id,
    });
  const { mutate } = api.deleteCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex h-screen w-screen">
      <div className="mx-2 basis-1/6">
        <Accordion type="single" collapsible className="ml-2 w-full">
          <AccordionItem value="item-1">
            <button
              className="py-3 text-white hover:underline"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: false,
                  chat: true,
                })
              }
            >
              Chat
            </button>
          </AccordionItem>
          <AccordionItem value="item-2">
            <button
              className="py-3 text-white hover:underline"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: true,
                  chat: false,
                })
              }
            >
              Calendar
            </button>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notes</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-around">
                <Button
                  className="py-3 text-white hover:underline"
                  onClick={() =>
                    setUiToggle({
                      editNotes: true,
                      posts: false,
                      schedules: false,
                      chat: false,
                    })
                  }
                >
                  Public Notes
                </Button>
                <Button className="py-3 text-white hover:underline">
                  Personal Notes
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Players</AccordionTrigger>
            <AccordionContent>
              {campaignPlayers !== null ? (
                campaignPlayers?.map((player) => (
                  <div className="mb-2" key={player.id}>
                    {player.username}
                  </div>
                ))
              ) : (
                <></>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
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
          {campaignNotes !== undefined && (
            <NotesPage
              showPublicNotes={showPublicNotes}
              campaignData={campaignData}
              campaignNotes={campaignNotes}
            />
          )}
        </div>
      )}
      {uiToggle.schedules && <CalendarComponent campaignData={campaignData} />}

      {uiToggle.chat && <CampaignChat campaignProps={campaignData} />}
    </div>
  );
}

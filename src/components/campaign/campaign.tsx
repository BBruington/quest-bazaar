"use client";
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import CampaignChat from "./chat/chat";
import CalendarComponent from "./posts/calendar";
import type { Campaign, Post, User } from "@prisma/client";
import NotesPage from "~/components/campaign/notes/notes";
import Posts from "./posts/posts";
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
  campaignPlayers: User[] | null;
  campaignPosts: Post[] | null;
}) {
  const { campaignData, campaignPlayers, campaignPosts } = props;
  const [uiToggle, setUiToggle] = useState({
    editNotes: false,
    posts: false,
    schedules: false,
    chat: true,
  });
  const router = useRouter();
  const { data: campaignNotes, isLoading } = api.queryCampaignNotes.useQuery({
    id: campaignData.id,
  });
  const { mutate } = api.deleteCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  if(isLoading) return <div>loading...</div>


  return (
    <div className="flex w-screen h-screen">
      <div className="mx-2 w-1/6">
        <Accordion type="single" collapsible className="ml-2 w-full">
          <AccordionItem value="item-1">
            <button
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
              Notes
            </button>
            {/* <AccordionTrigger>Notes</AccordionTrigger> */}
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
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
          <AccordionItem value="item-3">
            <AccordionTrigger>Posts</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start justify-start space-y-2">
                <Button
                  className="w-full"
                  onClick={() =>
                    setUiToggle({
                      editNotes: false,
                      posts: true,
                      schedules: false,
                      chat: false,
                    })
                  }
                >
                  View
                </Button>
                <Button className="w-full">Create</Button>
                <Button
                  className="w-full"
                  onClick={() =>
                    setUiToggle({
                      editNotes: false,
                      posts: false,
                      schedules: true,
                      chat: false,
                    })
                  }
                >
                  Scheduler
                </Button>
              </div>
            </AccordionContent>
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
          {campaignNotes !== undefined && (
            <NotesPage
              campaignData={campaignData}
              campaignNotes={campaignNotes}
            />
          )}
        </div>
      )}
      {uiToggle.posts && (
        <Posts campaignData={campaignData} campaignPosts={campaignPosts} />
      )}
      {uiToggle.schedules && <CalendarComponent campaignData={campaignData} />}

      {uiToggle.chat && <CampaignChat campaignProps={campaignData}/>}
    </div>
  );
}

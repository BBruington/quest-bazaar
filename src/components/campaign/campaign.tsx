"use client";
import { api } from "~/utils/trpc";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import type { Campaign, Players } from "./types";

export default function CampaignComponent(props: {
  campaignData: Campaign;
  campaignPlayers: Players[] | null | undefined;
  userId: string;
}) {
  const { campaignData, campaignPlayers, userId } = props;
  const [privateNotes, setPrivateNotes] = useState(false)
  const [uiToggle, setUiToggle] = useState({
    editNotes: false,
    posts: false,
    schedules: false,
    chat: true,
  });
  const router = useRouter();
  const { data: campaignNotes, isLoading } = api.queryCampaignNotes.useQuery({
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
    <div className="flex flex-col lg:flex-row h-screen w-screen">
      <div className="mx-2 basis-1/6 mb-2">
        <Accordion type="single" collapsible className="ml-2 w-full text-center lg:text-left">
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
            <AccordionTrigger className="justify-center lg:justify-between">DM</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-6 justify-center lg:justify-start">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{campaignData.dmName}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-center lg:justify-between">Players</AccordionTrigger>
            <AccordionContent>
              {campaignPlayers !== null ? (
                campaignPlayers?.map((player) => (
                  <div className="mb-2 flex space-x-6 items-center justify-center lg:justify-start" key={player.id}>
                    <Avatar>
                      <AvatarImage src={player.imgUrl ? player.imgUrl : "https://github.com/shadcn.png"} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{player.username}</span>
                  </div>
                ))
              ) : (
                <></>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="justify-center lg:justify-between">Notes</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center space-x-5 lg:justify-around">
                <Button
                  className="py-3 text-sm text-white hover:underline h-8 w-36"
                  onClick={() => {
                    setPrivateNotes(false)
                    setUiToggle({
                      editNotes: true,
                      posts: false,
                      schedules: false,
                      chat: false,
                    })}
                  }
                >
                  Public Notes
                </Button>
                <Button  
                  className="py-3 text-sm text-white hover:underline h-8 w-36"
                  onClick={() => {
                    setPrivateNotes(true)
                    setUiToggle({
                      editNotes: true,
                      posts: false,
                      schedules: false,
                      chat: false,
                    })}
                  }
                  >
                  Personal Notes
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="justify-center lg:justify-between">Campaign</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <AlertDialog>
                  <div className="flex justify-center space-x-5">
                    <AlertDialogTrigger
                      disabled={userId !== campaignData.dmUserId}
                    >
                        <Button
                          variant="destructive"
                          disabled={userId !== campaignData.dmUserId}
                          className="h-8 w-36"
                        >
                          Delete
                        </Button>
                    </AlertDialogTrigger>
                    <Button disabled={userId !== campaignData.dmUserId} className="h-8 w-36">Create Post</Button>
                  </div>
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
              userId={userId}
              privateNotes={privateNotes}
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

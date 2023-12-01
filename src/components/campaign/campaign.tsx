"use client";
import { api } from "../../utils/trpc";
import {
  MessageCircle,
  CalendarDays,
  User,
  Users,
  Scroll,
  Settings,
} from "lucide-react";
import Spinner from "../spinner/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import CampaignChat from "./chat/chat";
import CalendarComponent from "./calendar/calendar";
import NotesPage from "../../components/campaign/notes/notes";
import PostCreator from "../../app/post/create";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
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
  const [privateNotes, setPrivateNotes] = useState(false);
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
  if (isLoading) return <Spinner />;

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <div className="mx-2 mb-2 basis-1/6">
        <Accordion
          type="single"
          collapsible
          className="ml-2 w-full text-center lg:text-left"
        >
          <AccordionItem value="item-1">
            <button
              className="flex w-full lg:w-2/3 justify-center lg:justify-between py-2 text-white hover:underline"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: false,
                  chat: true,
                })
              }
            >
              <span>Chat</span> <MessageCircle className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-2">
            <button
              className="flex w-full lg:w-2/3 justify-center lg:justify-between py-3 text-white hover:underline"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: true,
                  chat: false,
                })
              }
            >
              <span>Calendar</span> <CalendarDays className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex justify-center sm:justify-between">
              <div className="flex w-full lg:w-2/3 justify-center lg:justify-between text-white hover:underline">
                <span>DM</span> <User className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-center space-x-6 lg:justify-start">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{campaignData.dmName}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-center lg:justify-between">
              <div className="flex lg:w-2/3 justify-between">
                <span>Players</span> <Users className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {campaignPlayers !== null ? (
                campaignPlayers?.map((player) => (
                  <div
                    className="mb-2 flex items-center justify-center space-x-6 lg:justify-start"
                    key={player.id}
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          player.imgUrl
                            ? player.imgUrl
                            : "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
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
            <AccordionTrigger className="justify-center lg:justify-between">
              <div className="flex lg:w-2/3 justify-between">
                <span>Notes</span> <Scroll className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center space-x-5 lg:justify-around">
                <Button
                  className="h-8 w-36 py-3 text-sm text-white hover:underline"
                  onClick={() => {
                    setPrivateNotes(false);
                    setUiToggle({
                      editNotes: true,
                      posts: false,
                      schedules: false,
                      chat: false,
                    });
                  }}
                >
                  Public Notes
                </Button>
                <Button
                  className="h-8 w-36 py-3 text-sm text-white hover:underline"
                  onClick={() => {
                    setPrivateNotes(true);
                    setUiToggle({
                      editNotes: true,
                      posts: false,
                      schedules: false,
                      chat: false,
                    });
                  }}
                >
                  Personal Notes
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="justify-center lg:justify-between">
              <div className="flex lg:w-2/3 justify-between">
                <span>Campaign</span> <Settings className="ml-2" />
              </div>
            </AccordionTrigger>
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
                    <Dialog>
                      <DialogTrigger
                        className="m-0"
                        disabled={userId !== campaignData.dmUserId}
                        asChild
                      >
                        <Button
                          disabled={userId !== campaignData.dmUserId}

                          className="h-8 w-36"
                        >
                          Create Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[1000px] bg-black sm:max-w-[1200px]">
                        <PostCreator campaignId={campaignData.id} />
                      </DialogContent>
                    </Dialog>
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

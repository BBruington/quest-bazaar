"use client";
import {
  MessageCircle,
  CalendarDays,
  User,
  Users,
  Scroll,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import CampaignChat from "./chat/chat";
import CalendarComponent from "./calendar/calendar";
import NotesPage from "../_components/notes/notes";
import PostCreator from "~/app/(post)/post/create";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
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
} from "~/components/ui/alert-dialog";
import type { Campaign, Players } from "./types";
import { useUser } from "@clerk/nextjs";
import { CampaignNote, CampaignSchedules } from "@prisma/client";
import { deleteCampaign, handleRequestToJoinGame } from "../actions";

export default function CampaignComponent(props: {
  campaignData: Campaign;
  campaignPlayers: Players[] | null | undefined;
  userId: string;
  campaignRequestingInvitePlayers: Players[] | null | undefined;
  myNotes: CampaignNote[];
  publicNotes: CampaignNote[];
  scheduledEvents: CampaignSchedules[];
}) {
  const {
    campaignData,
    campaignPlayers,
    userId,
    campaignRequestingInvitePlayers,
    myNotes,
    publicNotes,
    scheduledEvents,
  } = props;

  const user = useUser();
  if (!user) return <div>Could not fetch user</div>;

  const [isPrivateNotes, setIsPrivateNotes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uiToggle, setUiToggle] = useState({
    editNotes: false,
    posts: false,
    schedules: false,
    chat: true,
  });
  const router = useRouter();

  const handleDeleteCampaign = async () => {
    await deleteCampaign({ campaignId: campaignData.id });
    router.push(`/myCampaigns`);
  };

  const handleRequestToJoinGameResponse = async (
    playerId: string,
    response: "ACCEPTED" | "DECLINED"
  ) => {
    setIsLoading(true);
    await handleRequestToJoinGame({
      campaignId: campaignData.id,
      userId: playerId,
      response: response,
    });
    setIsLoading(false);
  };

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
              className="flex w-full justify-center py-2 text-white hover:underline lg:justify-start"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: false,
                  chat: true,
                })
              }
            >
              <span className="flex w-20 justify-start lg:ml-3">Chat</span>{" "}
              <MessageCircle className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-2">
            <button
              className="flex w-full justify-center py-3 text-white hover:underline lg:justify-start"
              onClick={() =>
                setUiToggle({
                  editNotes: false,
                  posts: false,
                  schedules: true,
                  chat: false,
                })
              }
            >
              <span className="flex w-20 justify-start lg:ml-3">Calendar</span>{" "}
              <CalendarDays className="ml-2" />
            </button>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">DM</span>{" "}
                <User className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-center space-x-6 lg:justify-start">
                <Avatar>
                  <AvatarImage
                    src={
                      campaignData.dmProfileImg
                        ? campaignData.dmProfileImg
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{campaignData.dmName}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Players</span>{" "}
                <Users className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {campaignPlayers !== null &&
              campaignPlayers?.length !== 0 &&
              campaignPlayers !== undefined ? (
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
                <span className="text-white ml-3">Invite some friends!</span>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Notes</span>{" "}
                <Scroll className="ml-2" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center space-x-5 lg:justify-around">
                <Button
                  className="h-8 w-32 py-3 text-xs text-white hover:underline"
                  onClick={() => {
                    setIsPrivateNotes(false);
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
                  className="h-8 w-32 py-3 text-xs text-white hover:underline"
                  onClick={() => {
                    setIsPrivateNotes(true);
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
            <AccordionTrigger className="justify-center lg:justify-start">
              <div className="flex">
                <span className="ml-3 flex w-20 justify-start">Campaign</span>{" "}
                <Settings className="ml-2" />
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
                        className="h-8 w-32"
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
                          className="h-8 w-32"
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
                      <AlertDialogAction onClick={handleDeleteCampaign}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {campaignRequestingInvitePlayers?.map((player) => (
                  <div key={player.id} className="mt-2 border-t-2 p-2">
                    <div>
                      <span>{player.username} would like to join</span>
                    </div>
                    <div className="mt-1 flex flex-col justify-around md:flex-row">
                      <Button
                        className="h-6"
                        disabled={isLoading}
                        onClick={() =>
                          handleRequestToJoinGameResponse(
                            player.clerkId,
                            "ACCEPTED"
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        className="h-6"
                        disabled={isLoading}
                        onClick={() =>
                          handleRequestToJoinGameResponse(
                            player.clerkId,
                            "DECLINED"
                          )
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {uiToggle.editNotes && (
        <div className="w-full">
          {publicNotes !== undefined && (
            <NotesPage
              userId={userId}
              isPrivateNotes={isPrivateNotes}
              campaignData={campaignData}
              campaignNotes={publicNotes}
              myNotes={myNotes}
            />
          )}
        </div>
      )}
      {uiToggle.schedules && (
        <CalendarComponent
          scheduledEvents={scheduledEvents}
          campaignData={campaignData}
        />
      )}

      {uiToggle.chat && (
        <CampaignChat
          userId={user.user?.id ? user.user?.id : ""}
          username={user.user?.username ? user.user?.username : ""}
          campaignProps={campaignData}
        />
      )}
    </div>
  );
}

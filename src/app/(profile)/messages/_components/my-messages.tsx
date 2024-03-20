import type { SelectedFriendType } from "~/app/types/Message";
import { prisma } from "~/utils/context";
import Link from "next/link";
import { Campaign, Friendship, Character } from "@prisma/client";
import { Mail, User, Plus, PersonStandingIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/trpc";
import { useState, type ChangeEvent } from "react";
import React from "react";

//actions
// import { addFriendRequest, handleCampaignInvite } from "../actions";

//components
import DisplayMessages from "./display-messages";
import FriendRequest from "./friend-requests";
import CampaignInvite from "./campaign-invites";
import SelectedFriend from "./selected-friend";
import AddFriendInput from "./add-friend-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default async function MyMessages(props: {
  userId: string;
  username: string | null;
}) {
  const { userId, username } = props;
  const [selectedFriend, setSelectedFriend] = useState<SelectedFriendType>({
    id: "",
    status: "",
    receiverName: "",
    receiverId: "",
    receiverImgUrl: null,
    senderName: "",
    senderId: "",
    senderImgUrl: null,
    createdAt: "",
    updatedAt: "",
  });

  const userData = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      characters: true,
      invitedCampaigns: true,
      receivedFriendRequests: true,
    },
  });
  interface userDataProps {
    characters: Character[];
    invitedCampaigns: Campaign[];
    receivedFriendRequests: Friendship[];
  }
  const utils = api.useContext();

  const handleReceivedFriendRequest = api.handleFriendRequest.useMutation({
    onSuccess: async () => {
      await utils.queryMyFriendRequests.invalidate();
    },
  });

  const handleReceivedCampaignInvite = api.handleCampaignInvite.useMutation({
    onSuccess: async () => {
      await utils.queryUserInvitedCampaigns.invalidate();
    },
  });

  // const { data: charactersheets } = api.queryCharactersByUserId.useQuery({
  //   userId,
  // });
  const { mutate: createNewCharacter } = api.createNewCharacter.useMutation({
    onSuccess: async (character) => {
      if (character) {
        await utils.queryCharactersByUserId.invalidate().then(() => {
          window.open(
            `${process.env.NEXT_PUBLIC_BASE_URL}/character/${character.id}`,
            "_blank"
          );
        });
      }
    },
  });

  // const { data: friendRequests } = api.queryMyFriendRequests.useQuery({
  //   id: userId,
  // });

  // const { data: friends } = api.queryMyFriends.useQuery({ id: userId });

  // const { data: receivedInvitedCampaigns } =
  //   api.queryUserInvitedCampaigns.useQuery({ userId: userId });

  // const pendingFriendRequests = friendRequests?.filter(function (request) {
  //   return request.status === "PENDING";
  // });

  let notificationsAmount = 0;
  // if (receivedInvitedCampaigns && pendingFriendRequests)
  //   notificationsAmount =
  //     receivedInvitedCampaigns.length + pendingFriendRequests.length;

  const handleCampaignInviteResponse = (
    campaignId: string,
    campaignRes: string
  ) => {
    handleReceivedCampaignInvite.mutate({
      campaignId,
      userId,
      campaignRes,
    });
  };

  const handleFriendRequestResponse = (
    senderId: string,
    requestResponse: string
  ) => {
    handleReceivedFriendRequest.mutate({
      senderId,
      receiverId: userId,
      response: requestResponse,
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex h-screen flex-col bg-foreground sm:flex-row">
        <div className="mx-2 flex w-full flex-col sm:w-1/3 lg:w-1/6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Add Friend</span>{" "}
                  <Plus className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AddFriendInput
                  userId={userId}
                  username={username ? username : ""}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Friends</span>{" "}
                  <User className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  {/* {!friends || friends.length === 0 ? (
                    <span className="text-slate-400">Empty</span>
                  ) : (
                    <></>
                  )}
                  {friends?.map((friend) => (
                    <div
                      key={friend.id}
                      role="button"
                      className="w-full py-1 hover:bg-slate-800"
                      onClick={() => setSelectedFriend(friend)}
                    >
                      <div className="flex items-center space-x-3">
                        {friend.receiverId === userId ? (
                          <>
                            <Avatar>
                              <AvatarImage
                                src={
                                  friend.receiverId === userId
                                    ? friend.senderImgUrl!
                                    : friend.receiverImgUrl!
                                }
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>{friend.senderName}</span>
                          </>
                        ) : (
                          <>
                            <Avatar>
                              <AvatarImage
                                src={
                                  friend.receiverId === userId
                                    ? friend.senderImgUrl!
                                    : friend.receiverImgUrl!
                                }
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>{friend.receiverName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))} */}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Notifications</span>{" "}
                  <Mail className="invisible sm:visible sm:ml-2" />
                </div>
                <span
                  className={`${
                    notificationsAmount > 0
                      ? "h-4 w-4 items-center rounded-full bg-red-600 text-xs text-white"
                      : ""
                  }`}
                >
                  {notificationsAmount === 0 ? null : notificationsAmount}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {/* UserNotifications */}
                  {userData?.receivedFriendRequests?.map((friendRequest) => (
                    <React.Fragment key={friendRequest.id}>
                      <div className="flex border-b border-white pb-3 md:flex-col">
                        <span className="mb-1 flex justify-center text-sm">
                          {friendRequest.senderName} would like to be Friends
                        </span>
                        <div className="mt-1 flex flex-col justify-around md:flex-row">
                          <FriendRequest
                            userId={userId}
                            notification={friendRequest}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  {userData?.invitedCampaigns?.map((campaign) => (
                    <React.Fragment key={campaign.id}>
                      <div className="flex border-b border-white pb-3 md:flex-col">
                        <div>
                          <span>
                            You have been invited to join {campaign.name}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col justify-around md:flex-row">
                          <CampaignInvite
                            userId={userId}
                            notification={campaign}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Characters</span>{" "}
                  <PersonStandingIcon className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col">
                  <div className="flex w-full items-center justify-center space-x-3 py-1 hover:cursor-pointer hover:bg-slate-800">
                    <span
                      onClick={() => createNewCharacter({ userId: userId })}
                    >
                      Create New Character
                    </span>
                  </div>
                  {/* {charactersheets?.map((sheet) => (
                    <Link
                      className="w-full py-1 hover:bg-slate-800"
                      key={sheet.id}
                      target="_blank"
                      href={`/character/${sheet.id}`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <span className="">{sheet.charname}</span>
                      </div>
                    </Link>
                  ))} */}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {selectedFriend.id !== "" && selectedFriend.receiverId === userId ? (
            <div
              className={
                selectedFriend.id === ""
                  ? "invisible h-0"
                  : "visible mb-1 mt-8 flex h-0 items-center justify-center space-x-2 sm:invisible"
              }
            >
              <Avatar className={selectedFriend.id === "" ? "invisible" : ""}>
                <AvatarImage
                  src={
                    selectedFriend.receiverId === userId
                      ? selectedFriend.senderImgUrl!
                      : selectedFriend.receiverImgUrl!
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-white">{selectedFriend.senderName}</span>
            </div>
          ) : (
            <div
              className={
                selectedFriend.id === ""
                  ? "invisible h-0"
                  : "visible mb-1 mt-8 flex h-0 items-center justify-center space-x-2 sm:invisible"
              }
            >
              <Avatar>
                <AvatarImage
                  src={
                    selectedFriend.receiverId === userId
                      ? selectedFriend.senderImgUrl!
                      : selectedFriend.receiverImgUrl!
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-white">{selectedFriend.receiverName}</span>
            </div>
          )}
          <div className="invisible mt-5 flex h-0 w-full sm:visible sm:h-60 lg:invisible lg:h-0">
            <SelectedFriend selectedFriend={selectedFriend} userId={userId} />
          </div>
        </div>

        <DisplayMessages selectedFriend={selectedFriend} userId={userId} />
        <div className="invisible w-0 lg:visible lg:w-1/6">
          <SelectedFriend selectedFriend={selectedFriend} userId={userId} />
        </div>
      </div>
    </>
  );
}
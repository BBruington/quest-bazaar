"use client";
import DisplayMessages from "./profile/displayMessages";
import SelectedFriend from "./profile/selectedFriend";
import { api } from "~/utils/trpc";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { ChangeEvent } from "react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function MyMessages(props: { userId: string }) {
  const { userId } = props;
  const [selectedFriend, setSelectedFriend] = useState({
    id: "",
    status: "",
    receiverName: "",
    senderName: "",
    senderId: "",
    receiverId: "",
    createdAt: "",
    updatedAt: "",
  });

  const [addFriendInput, setAddFriendInput] = useState("");

  const utils = api.useContext();
  const { user } = useUser();

  const sendAddFriendRequest = api.addFriend.useMutation();

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

  const { data: friendRequests } = api.queryMyFriendRequests.useQuery({
    id: userId,
  });

  const { data: friends } = api.queryMyFriends.useQuery({ id: userId });

  const { data: receivedInvitedCampaigns } =
    api.queryUserInvitedCampaigns.useQuery({ userId: userId });
  if (!user) return <div>loading...</div>;

  const pendingFriendRequests = friendRequests?.filter(function (request) {
    return request.status === "PENDING";
  });

  let notificationsAmount = 0;
  if (receivedInvitedCampaigns && pendingFriendRequests)
    notificationsAmount =
      receivedInvitedCampaigns.length + pendingFriendRequests.length;
  const handleAddFriendChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setAddFriendInput(value);
  };
  const handleAddFriend = (friendName: string) => {
    sendAddFriendRequest.mutate({
      receiverName: friendName,
      id: user.id,
      senderName: user.username!,
    });
    setAddFriendInput("");
  };

  const handleCampaignInviteResponse = (
    campaignId: string,
    campaignRes: string
  ) => {
    handleReceivedCampaignInvite.mutate({
      campaignId,
      userId: user.id,
      campaignRes,
    });
  };

  const handleFriendRequestResponse = (
    senderId: string,
    requestResponse: string
  ) => {
    handleReceivedFriendRequest.mutate({
      senderId,
      receiverId: user.id,
      response: requestResponse,
    });
  };

  return (
    <div className="flex h-screen bg-foreground">
      <div className="mx-2 w-1/6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Add Friend</AccordionTrigger>
            <AccordionContent>
              <div className="flex">
                <Input
                  id="name"
                  name="name"
                  value={addFriendInput}
                  onChange={handleAddFriendChange}
                  placeholder="Friend"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (addFriendInput !== "") {
                        handleAddFriend(addFriendInput);
                      }
                    }
                  }}
                  className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                />
                {addFriendInput.length > 0 ? (
                  <Button
                    onClick={() => handleAddFriend(addFriendInput)}
                    className="ml-2"
                  >
                    Add
                  </Button>
                ) : (
                  <Button disabled className="ml-2">
                    Add
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Friends</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {!friends || friends.length === 0 ? (<span className="text-slate-400">Empty</span>) : (<></>)}
                {friends?.map((friend) => (
                  <div
                    key={friend.id}
                    role="button"
                    className="w-full py-1 hover:bg-slate-800"
                    onClick={() => setSelectedFriend(friend)}
                  >
                    <div className="flex items-center space-x-3">
                      {friend.receiverId === user.id ? (
                        <>
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
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
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>{friend.receiverName}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Notifications{" "}
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
                {receivedInvitedCampaigns && friendRequests && receivedInvitedCampaigns?.length + friendRequests?.length === 0 && (
                  <span className="text-slate-400">No New Notifications</span>
                )}
                {friendRequests?.map((friendRequest) => (
                  <React.Fragment key={friendRequest.id}>
                    <div className="flex border-b border-white pb-3 md:flex-col">
                      <span className="mb-1 flex justify-center text-sm">
                        {friendRequest.senderName} would like to be Friends
                      </span>
                      <div className="mt-1 flex flex-col justify-around md:flex-row">
                        <Button
                          className="h-6"
                          disabled={handleReceivedFriendRequest.isLoading}
                          onClick={() =>
                            handleFriendRequestResponse(
                              friendRequest.senderId,
                              "ACCEPTED"
                            )
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          className="h-6"
                          disabled={handleReceivedFriendRequest.isLoading}
                          onClick={() =>
                            handleFriendRequestResponse(
                              friendRequest.senderId,
                              "DECLINED"
                            )
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                {receivedInvitedCampaigns?.map((campaign) => (
                  <React.Fragment key={campaign.id}>
                    <div>
                      <span>You have been invited to join {campaign.name}</span>
                    </div>
                    <div className="mt-1 flex flex-col justify-around md:flex-row">
                      <Button
                        className="h-6"
                        disabled={handleReceivedCampaignInvite.isLoading}
                        onClick={() =>
                          handleCampaignInviteResponse(campaign.id, "ACCEPTED")
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        className="h-6"
                        disabled={handleReceivedCampaignInvite.isLoading}
                        onClick={() =>
                          handleCampaignInviteResponse(campaign.id, "DECLINED")
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <DisplayMessages selectedFriend={selectedFriend} userId={user.id} />

      <SelectedFriend selectedFriend={selectedFriend} userId={user.id} />
    </div>
  );
}

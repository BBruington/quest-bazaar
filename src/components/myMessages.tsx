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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function MyMessages() {
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

  const { user } = useUser();
  if (!user) return <div>loading...</div>;

  const addFriendMutation = api.addFriend.useMutation();
  const handleFrRequestMutation = api.handleFriendRequest.useMutation();
  const handleCampaignInvites = api.handleCampaignInvite.useMutation();

  const { data: friendRequests, isLoading: loadingFriendRequests } =
    api.queryMyFriendRequests.useQuery({ id: user.id });
  const {
    data: userInvitedCampaigns,
    isLoading: fetchingUserInvitedCampaigns,
  } = api.queryUserInvitedCampaigns.useQuery({ userId: user.id });
  const pendingFR = friendRequests?.filter(function (request) {
    return request.status === "PENDING";
  });

  const handleAddFriendChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setAddFriendInput(value);
  };
  const handleAddFriend = (friendName: string) => {
    const id = user.id;
    const friendRes = addFriendMutation.mutate({
      receiverName: friendName,
      id,
      senderName: user.username!,
    });
    setAddFriendInput("");
    return friendRes;
  };

  const handleCampaignInvite = (campaignId: string, campaignRes: string) => {
    handleCampaignInvites.mutate({ campaignId, userId: user.id, campaignRes });
  };

  const handleFriendRequest = (senderId: string, frResponse: string) => {
    const fr = handleFrRequestMutation.mutate({
      senderId,
      receiverId: user.id,
      response: frResponse,
    });
    return fr;
  };

  return (
    <>
      <div className="flex h-screen bg-foreground">
        <div className="mx-2 w-1/6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
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
                  ></Input>
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
            <AccordionItem value="item-1">
              <AccordionTrigger>Friends</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  {friendRequests?.map((friendRequest) => (
                    <>
                      <button
                        className="w-full py-1 hover:bg-slate-800"
                        onClick={() => setSelectedFriend(friendRequest)}
                      >
                        <div className="flex items-center space-x-3">
                          {friendRequest.status === "ACCEPTED" ? (
                            <>
                              <Avatar>
                                <AvatarImage
                                  src="https://github.com/shadcn.png"
                                  alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span>{friendRequest.senderName}</span>
                            </>
                          ) : null}
                        </div>
                      </button>
                    </>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Notifications{" "}
                <span
                  className={`${
                    pendingFR && pendingFR.length > 0
                      ? "h-4 w-4 items-center rounded-full bg-red-600 text-xs text-white"
                      : ""
                  }`}
                >
                  {pendingFR && pendingFR.length > 0 ? pendingFR.length : null}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {friendRequests?.map((friendRequest) => (
                    <>
                      {friendRequest.status === "PENDING" ? (
                        <div className="flex border-b border-white pb-3 md:flex-col">
                          <span className="mb-1 flex justify-center text-sm">
                            {friendRequest.senderName} would like to be Friends
                          </span>
                          <div className="mt-1 flex flex-col justify-around md:flex-row">
                            <Button
                              className="h-6"
                              onClick={() =>
                                handleFriendRequest(
                                  friendRequest.senderId,
                                  "ACCEPTED"
                                )
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              className="h-6"
                              onClick={() =>
                                handleFriendRequest(
                                  friendRequest.senderId,
                                  "DECLINED"
                                )
                              }
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ))}
                  {userInvitedCampaigns?.map((campaign) => (
                    <>
                      <div>
                        <span>
                          You have been invited to join {campaign.name}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-col justify-around md:flex-row">
                        <Button
                          className="h-6"
                          onClick={() =>
                            handleCampaignInvite(campaign.id, "ACCEPTED")
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          className="h-6"
                          onClick={() =>
                            handleCampaignInvite(campaign.id, "DECLINED")
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    </>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DisplayMessages selectedFriend={selectedFriend} />

        <SelectedFriend selectedFriend={selectedFriend} userId={user.id} />
      </div>
    </>
  );
}

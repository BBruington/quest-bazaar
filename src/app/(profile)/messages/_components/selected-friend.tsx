"use client";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import toast, { Toaster } from "react-hot-toast";
import { handleFriendRequest, inviteToCampaign } from "../actions";
import { useAtom } from "jotai";
import { selectedFriendAtom } from "../jotaiAtoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Campaign, User } from "@prisma/client";
import { useState } from "react";

interface SelectedFriendProps {
  userId: User["clerkId"];
  userCampaigns: Campaign[];
}

export default function SelectedFriend({
  userId,
  userCampaigns,
}: SelectedFriendProps) {
  const [selectedFriend, setSelectedFriend] = useAtom(selectedFriendAtom);
  const [isLoading, setIsLoading] = useState(false);

  let profilePic: string | undefined;

  const findFriendId = (myId: User["clerkId"]) => {
    if (myId === selectedFriend.senderId) {
      profilePic = selectedFriend.receiverImgUrl!;
      return selectedFriend.receiverId;
    }
    profilePic = selectedFriend.senderImgUrl!;
    return selectedFriend.senderId;
  };

  const friendId = findFriendId(userId);

  interface InviteToCampaignProps {
    playerId: User["clerkId"];
    campaignId: Campaign["id"];
  }

  const handleInviteToCampaign = async ({
    playerId,
    campaignId,
  }: InviteToCampaignProps) => {
    setIsLoading(true);
    const response = await inviteToCampaign({
      playerId: playerId,
      campaignId: campaignId,
    });
    if (response?.status === "SUCCESS") {
      toast.success(response.message);
    } else {
      toast.error(
        `${response?.message ? response?.message : "Something went wrong"}`
      );
    }
    setIsLoading(false);
  };

  const handleFriendRemove = async () => {
    setIsLoading(true);
    if (friendId === selectedFriend.senderId) {
      await handleFriendRequest({
        senderId: selectedFriend.senderId,
        receiverId: userId,
        response: "DECLINED",
      });
    }
    if (friendId === selectedFriend.receiverId) {
      await handleFriendRequest({
        senderId: userId,
        receiverId: selectedFriend.receiverId,
        response: "DECLINED",
      });
    }
    setSelectedFriend({
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
    setIsLoading(false);
  };

  return (
    <div className="m-8 flex w-2/3 items-center justify-center sm:m-0 sm:w-full">
      <Toaster />
      {selectedFriend?.senderName && (
        <div className="sm:h-50 mx-2 flex h-40 w-full items-center justify-center bg-accent-foreground sm:h-80 xl:h-60">
          <div className="justify-top flex  h-2/3 w-5/6 items-center bg-foreground sm:h-4/6 sm:flex-col">
            <div className="flex flex-col items-center">
              <div className="mt-5 text-white">
                <Avatar>
                  <AvatarImage
                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
                    src={
                      profilePic ? profilePic : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-1 text-white">
                {selectedFriend.senderId === userId
                  ? selectedFriend.receiverName
                  : selectedFriend.senderName}
              </div>
            </div>
            <div className="mb-5 mt-auto flex flex-row items-center justify-center sm:flex-col sm:space-y-2 xl:flex-row xl:space-x-2 xl:space-y-0">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="h-8 w-20">
                    Invite
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex justify-center">
                    Campaigns
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {selectedFriend.id &&
                  userCampaigns &&
                  userCampaigns.length > 0 ? (
                    userCampaigns.map((campaign) => (
                      <DropdownMenuItem
                        disabled={isLoading}
                        onClick={() =>
                          handleInviteToCampaign({
                            playerId: friendId,
                            campaignId: campaign.id,
                          })
                        }
                        key={campaign.id}
                      >
                        {campaign.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-center text-sm">
                        Find a Campaign to Join
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => handleFriendRemove()}
                variant="destructive"
                className="px-none h-8 w-20"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

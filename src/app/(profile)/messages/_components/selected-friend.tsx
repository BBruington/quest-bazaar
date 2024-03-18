"use client";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/utils/trpc";
import type { SelectedFriendType } from "~/app/types/Message";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function SelectedFriend(props: {
  selectedFriend: SelectedFriendType;
  userId: string;
}) {
  const { selectedFriend, userId } = props;

  const { data: userCampaigns } = api.queryUserCampaigns.useQuery({
    id: userId,
  });

  const sendCampaignInvite = api.inviteToCampaign.useMutation({
    onSuccess: () => {
      toast.success("Invite Sent");
    },
  });
  const handleRemoveFriend = api.handleFriendRequest.useMutation();

  let profilePic: string | undefined;

  const findFriendId = (myId: string) => {
    if (myId === selectedFriend.senderId) {
      profilePic = selectedFriend.receiverImgUrl!;
      return selectedFriend.receiverId;
    }
    profilePic = selectedFriend.senderImgUrl!;
    return selectedFriend.senderId;
  };

  const friendId = findFriendId(userId);

  const handleFriendRemove = () => {
    if (friendId === selectedFriend.senderId) {
      handleRemoveFriend.mutate({
        senderId: selectedFriend.senderId,
        receiverId: userId,
        response: "DECLINED",
      });
    }
    if (friendId === selectedFriend.receiverId) {
      handleRemoveFriend.mutate({
        senderId: userId,
        receiverId: selectedFriend.receiverId,
        response: "DECLINED",
      });
    }
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
                  <Button className="h-8 w-20">Invite</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Campaigns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {selectedFriend.id &&
                  userCampaigns &&
                  userCampaigns.length > 0 ? (
                    userCampaigns.map((campaign) => (
                      <DropdownMenuItem
                        disabled={sendCampaignInvite.isLoading}
                        onClick={() =>
                          sendCampaignInvite.mutate({
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
                      <DropdownMenuItem>
                        Find a Campaign to Join
                      </DropdownMenuItem>
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

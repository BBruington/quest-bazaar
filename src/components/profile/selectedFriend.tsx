"use client";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { api } from "~/utils/trpc";
import type { SelectedFriendType } from "~/app/types/Message";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function SelectedFriend(props: {
  selectedFriend: SelectedFriendType;
  userId: string;
}) {
  const { selectedFriend, userId } = props;

  const { data: userCampaigns } =
    api.queryUserCampaigns.useQuery({ id: userId });

  const sendCampaignInvite = api.inviteToCampaign.useMutation();
  const handleRemoveFriend = api.handleFriendRequest.useMutation();
  
  let profilePic: string;

  const findFriendId = (myId: string) => {
    if (myId === selectedFriend.senderId) {
      profilePic = selectedFriend.receiverImgUrl!
      return selectedFriend.receiverId;
    }
    profilePic = selectedFriend.senderImgUrl!
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
    <div className="flex justify-center items-center w-2/3 sm:w-full m-8 sm:m-0">
      {selectedFriend?.senderName && (
        <div className="mx-2 flex xl:h-60 sm:h-80 h-40 sm:h-50 w-full items-center justify-center bg-accent-foreground">
          <div className="justify-top flex  h-2/3 sm:h-4/6 w-5/6 sm:flex-col items-center bg-foreground">
            <div className="flex flex-col items-center">
              <div className="mt-5 text-white">
                <Avatar>
                  <AvatarImage
                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
                    src={profilePic ? profilePic : "https://github.com/shadcn.png"}
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
            <div className="mb-5 mt-auto flex flex-row sm:flex-col xl:flex-row sm:space-y-2 xl:space-y-0 xl:space-x-2 items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="w-20 h-8">Invite</Button>
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
                className="px-none w-20 h-8"
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

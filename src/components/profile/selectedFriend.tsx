"use client";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { api } from "~/utils/trpc";
import type { SelectedFriend } from "~/app/types/Message";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function SelectedFriend(props: {
  selectedFriend: SelectedFriend;
  userId: string;
}) {
  const { selectedFriend, userId } = props;

  const { data: userCampaigns, isLoading: loadingUserCampaigns } =
    api.queryUserCampaigns.useQuery({ id: userId });

  const sendCampaignInvite = api.inviteToCampaign.useMutation();
  const handleRemoveFriend = api.handleFriendRequest.useMutation();

  const findFriendId = (myId: string) => {
    if (myId === selectedFriend.senderId) return selectedFriend.receiverId;
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
    <div className="w-1/6">
      {selectedFriend?.senderName && (
        <div className="mx-2 flex h-60 items-center justify-center bg-accent-foreground">
          <div className="justify-top flex h-4/6 w-5/6 flex-col items-center bg-foreground">
            <div className="mt-5 text-white">
              <Avatar>
                <AvatarImage
                  className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
                  src="https://github.com/shadcn.png"
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
            <div className="mb-5 mt-auto flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="mr-5">Invite</Button>
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
                className="px-none w-1/3"
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

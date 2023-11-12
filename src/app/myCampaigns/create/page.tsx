"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/trpc";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function CreateCampaign() {
  const { user } = useUser();
  const router = useRouter();
  const [campaignProps, setCampaignProps] = useState({
    name: "",
    description: "",
    friends: [{id: '', name: ''}],
    imgUrl: "",
  });
  const [friends, setFriends] = useState([{name: '', id:""}]);
  if (!user) return <div>failed to load user</div>;
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampaignProps({ ...campaignProps, [name]: value });
  };

  type FriendList = {
    id: string;
    name: string
  }
  const inviteFriendToCampaign = (invitedFriend: FriendList) => {
    if(campaignProps.friends.find((friend) => friend === invitedFriend)) return;
    if(campaignProps.friends[0] !== undefined && campaignProps.friends[0].name === '') {campaignProps.friends[0] = invitedFriend}
    else{
      campaignProps.friends.push(invitedFriend)
    }
  }

  const { data: friendsList } = api.queryMyFriends.useQuery({ id: user.id });

  const { mutate } = api.createCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const findFriendsIds = () => {
    const array: FriendList[]  = [];
    friendsList?.map((friend) => {
      if (friend.receiverId === user.id) array.push({id:friend.senderId, name:friend.senderName});
      else if (friend.senderId === user.id) array.push({id: friend.receiverId, name: friend.receiverName});
      if (array.length === 0) {
        setFriends([{name:"You don't seem to have anyone to add", id:''}]);
      } else {
        setFriends(array);
      }
    });
  };

  if (friends[0]?.id === "") findFriendsIds();

  return (
    <div>
      <div className="ml-2">
        <label className="text-white" htmlFor="name">
          Campaign Name:
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={campaignProps.name}
          onChange={handleChange}
        />
      </div>
      <div className="ml-2">
        <label className="text-white" htmlFor="description">
          Description:
        </label>
        <Input
          id="description"
          name="description"
          value={campaignProps.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-5 m-2">
        <Button className="h-10 w-30"
          onClick={(e) => {
            e.preventDefault();
            if (campaignProps.name !== "" && campaignProps.description !== "") {
              mutate({
                id: user.id,
                name: campaignProps.name,
                description: campaignProps.description,
              });
            }
          }}
        >
          Create Campaign
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-40">Invite Friends</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Friends</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {friends ? (
              friends.map((friend, index) => (
                <DropdownMenuItem onClick={() => inviteFriendToCampaign(friend)} key={index}>{friend.name}</DropdownMenuItem>
              ))
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

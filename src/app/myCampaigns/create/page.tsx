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
    friends: [''],
    imgUrl: "",
  });
  const [friends, setFriends] = useState(['']);
  if(!user) return <div>failed to load user</div>
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampaignProps({ ...campaignProps, [name]: value });
  };

  const {data: friendsList} = api.queryMyFriends.useQuery({id: user.id})
  
  const { mutate } = api.createCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const test = () => {
    const array: string[] = []
    friendsList?.map((friend) => {
    if(friend.receiverId === user.id) array.push(friend.senderName)
    else if (friend.senderId === user.id) array.push(friend.receiverName)
    if(array.length === 0) {
      setFriends(["You don't seem to have anyone to add"])
    }else {
      setFriends(array)
    }
  })}

  if(friends[0] === '') test()

  return (
    <>
      <div>
        <div>
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
        <div>
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
        <Button
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
          <DropdownMenuTrigger>Invite Friends</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Friends</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {friends? (friends.map((friend, index) => (
              <DropdownMenuItem key={index}>{friend}</DropdownMenuItem>
            ))):(<></>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

"use client";

import { Friendship, User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createCampaign } from "../actions";

interface CreateCampaignFormProps {
  friendsList: Friendship[];
  user: User;
}

export default function CreateCampaignForm({
  friendsList,
  user,
}: CreateCampaignFormProps) {
  const router = useRouter();

  const [campaignChecker, setCampaignChecker] = useState({
    name: false,
    description: false,
  });
  const [imageFile, setImageFile] = useState<string | undefined>();
  const [campaignProps, setCampaignProps] = useState({
    name: "",
    description: "",
    friends: [{ id: "", name: "" }],
  });
  const [friends, setFriends] = useState([{ name: "", id: "" }]);

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (file !== undefined) {
        const fileString = URL.createObjectURL(file);
        setImageFile(fileString);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampaignProps({ ...campaignProps, [name]: value });
  };

  type FriendList = {
    id: string;
    name: string;
  };

  const removeFriend = (friendIndex: number) => {
    campaignProps.friends.splice(friendIndex, 1);
    router.refresh();
  };

  const inviteFriendToCampaign = (invitedFriend: FriendList) => {
    if (campaignProps.friends.find((friend) => friend.id === invitedFriend.id))
      return;
    if (
      campaignProps.friends[0] !== undefined &&
      campaignProps.friends[0].name === ""
    ) {
      campaignProps.friends[0] = invitedFriend;
    } else {
      campaignProps.friends.push(invitedFriend);
    }
    router.refresh();
  };

  const findFriendsIds = () => {
    const array: FriendList[] = [];
    friendsList?.map((friend) => {
      if (friend.receiverId === user.id)
        array.push({ id: friend.senderId, name: friend.senderName });
      else if (friend.senderId === user.id)
        array.push({ id: friend.receiverId, name: friend.receiverName });
      if (array.length === 0) {
        setFriends([{ name: "You don't seem to have anyone to add", id: "" }]);
      } else {
        setFriends(array);
      }
    });
  };

  //if (friends[0]?.id === "") findFriendsIds();

  const handleCreateCampaign = async () => {
    if (campaignProps.name === "" || campaignProps.description === "") {
      if (campaignProps.name === "" && campaignProps.description === "") {
        setCampaignChecker({
          name: true,
          description: true,
        });
        return;
      } else {
        if (campaignProps.name === "") {
          setCampaignChecker({
            ...campaignChecker,
            name: true,
          });
        }
        if (campaignProps.description === "") {
          setCampaignChecker({
            ...campaignChecker,
            description: true,
          });
        }
        return;
      }
    }
    const response = await createCampaign({
      userId: user.id,
      imageUrl: imageFile ? imageFile : "",
      dmProfileImg: user.imgUrl ? user.imgUrl : null,
      dmName: user.username ? user.username : "",
      title: campaignProps.name,
      description: campaignProps.description,
      friends:
        campaignProps.friends[0]?.id === "" ? undefined : campaignProps.friends,
    });
    if (response) {
      void router.push(`/myCampaigns/${response.id}`);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col p-8 lg:w-1/2">
        <div className="ml-2">
          <Label className="text-white" htmlFor="name">
            Campaign Name:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="name"
            name="name"
            value={campaignProps.name}
            onChange={handleChange}
          />
          {campaignChecker.name && (
            <span className="text-red-500">Please give the post a name</span>
          )}
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white" htmlFor="description">
            Description:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            id="description"
            name="description"
            value={campaignProps.description}
            onChange={handleChange}
          />
          {campaignChecker.description && (
            <span className="text-red-500">
              Please give the post a description
            </span>
          )}
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white" htmlFor="description">
            Image:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImageFile}
          />
        </div>
        <div className="m-2 flex justify-between gap-5">
          <Button className="w-30 h-10" onClick={handleCreateCampaign}>
            Create Campaign
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 w-40 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Invite Friends
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Friends</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {friends ? (
                friends.map((friend, index) => (
                  <DropdownMenuItem
                    onClick={() => inviteFriendToCampaign(friend)}
                    key={index}
                  >
                    {friend.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <></>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center p-3 lg:w-1/2">
        <h1 className="mb-5 w-full text-center text-2xl text-white">Preview</h1>
        <div className="group cursor-pointer items-center overflow-hidden rounded-md border border-primary-foreground lg:w-4/6 xl:w-1/2">
          <img
            className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            src={`${
              imageFile === "" || imageFile === undefined
                ? "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                : imageFile
            }`}
            alt="Campaign main image"
          />
          <div className="flex justify-between bg-accent-foreground p-5 ">
            <div>
              <p className="text-lg font-bold text-white">
                {campaignProps.name !== undefined ? (
                  campaignProps.name.substring(0, 30)
                ) : (
                  <></>
                )}
              </p>
              <div className="flex space-x-5">
                <p className="flex text-xs text-white">
                  {user.username ? (
                    <>By: {user.username}</>
                  ) : (
                    <>By: John Smith</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center text-white">
          <span className="text-lg font-bold">Friends Invited:</span>
          <div className="space-x-4">
            {campaignProps.friends[0]?.name !== "" &&
              campaignProps.friends[0]?.name !== undefined &&
              campaignProps.friends.map((friend, index) => (
                <DropdownMenu key={friend.id}>
                  <DropdownMenuTrigger className="inline-flex h-10 w-40 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    {friend.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-blue-900 ">
                    <DropdownMenuItem
                      className=" bg-blue-900 text-white hover:bg-primary-foreground"
                      onClick={() => removeFriend(index)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

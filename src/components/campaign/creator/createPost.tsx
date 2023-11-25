"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/trpc";
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
import { Label } from "~/components/ui/label";

export default function CreatePostComponent(props: {
  userId: string;
  username: string | undefined;
}) {
  const { userId, username } = props;
  const router = useRouter();
  const [imageFile, setImageFile] = useState<string | undefined>();
  const [postProps, setPostProps] = useState({
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
    setPostProps({ ...postProps, [name]: value });
  };

  type FriendList = {
    id: string;
    name: string;
  };
  const inviteFriendToCampaign = (invitedFriend: FriendList) => {
    if (postProps.friends.find((friend) => friend.id === invitedFriend.id))
      return;
    if (
      postProps.friends[0] !== undefined &&
      postProps.friends[0].name === ""
    ) {
      postProps.friends[0] = invitedFriend;
    } else {
      postProps.friends.push(invitedFriend);
    }
  };
  const { mutate } = api.createCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const handleCreatePost = () => {
    if (postProps.name !== "" && postProps.description !== "") {
      mutate({
        id: userId,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        imageUrl: imageFile === undefined ? "" : imageFile,
        name: postProps.name,
        description: postProps.description,
        friendsIds:
          postProps.friends[0]?.id === ""
            ? undefined
            : postProps.friends,
      });
    }
  };

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="ml-2">
          <Label className="text-white" htmlFor="name">
            Campaign Name:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="name"
            name="name"
            value={postProps.name}
            onChange={handleChange}
          />
          d
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white" htmlFor="description">
            Description:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            id="description"
            name="description"
            value={postProps.description}
            onChange={handleChange}
          />
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
        <div className="mb-2 ml-2">
          <Label className="text-white">Imgage Url</Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="imageUrl"
            value={
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              imageFile !== undefined ? imageFile : undefined
            }
            onChange={handleChange}
          />
        </div>
        <div className="m-2 flex justify-between gap-5">
          <Button className="w-30 h-10" onClick={handleCreatePost}>
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
      <div className="flex flex-col h-full w-full lg:w-1/2 p-3 items-center justify-center">
        <h1 className="mb-5 w-full text-2xl text-white text-center">
          Preview
        </h1>
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
                {postProps.name !== undefined ? postProps.name.substring(0, 30) : <></>}
              </p>
              <div className="flex space-x-5">
                <p className="flex text-xs text-white">
                  {username ? <>By: {username}</> : <>By: John Smith</>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
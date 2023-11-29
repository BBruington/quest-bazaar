"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
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
        imageUrl: imageFile ? imageFile : "",
        name: postProps.name,
        description: postProps.description,
        friendsIds:
          postProps.friends[0]?.id === "" ? undefined : postProps.friends,
      });
    }
  };

  return (
    //   players        Int?
    // startingLevel  Int?
    // finishingLevel Int?
    // title          String
    // description    String
    // author         String
    // mainImage      String
    // body           String
    <div className="flex h-[600px] max-h-[1200px] w-full flex-col bg-black lg:flex-row">
      <div className="flex w-full flex-col">
        <div className="mx-2">
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
        </div>
        <div className="mx-2 mb-1">
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
        <div className="mx-2 mb-1">
          <Label className="text-white" htmlFor="description">
            Body:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            id="description"
            name="description"
            value={postProps.description}
            onChange={handleChange}
          />
        </div>
        <div className="mx-2 mb-1">
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
        <div className="mx-2 mb-2">
          <Label className="text-white">Imgage Url</Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="imageUrl"
            value={imageFile ? imageFile : undefined}
            onChange={handleChange}
          />
        </div>
        <div className="mx-2 mb-2">
          <div className="flex space-x-3">
            <div className="">
              <Label className="text-white">Starting Level</Label>
              <Input
                className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                type="number"
                min="1"
                max="20"
                id="imageUrl"
                value={imageFile ? imageFile : undefined}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-white">Ending Level</Label>
              <Input
                className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                type="number"
                min="1"
                max="20"
                id="imageUrl"
                value={imageFile ? imageFile : undefined}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-white">Players</Label>
              <Input
                className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                type="number"
                id="imageUrl"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="m-2 flex justify-between gap-5">
          <Button className="w-30 h-10" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
}

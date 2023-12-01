"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import toast, {Toaster} from 'react-hot-toast'
import { api } from "../../utils/trpc";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

export default function CreatePostComponent(props: {
  userId: string;
  username: string | undefined;
  campaignId: string;
}) {
  const { userId, username, campaignId } = props;
  const [imageFile, setImageFile] = useState<string | undefined>();
  const [postProps, setPostProps] = useState({
    title: "",
    description: "",
    body: "",
    players: 0,
    startingLevel: 1,
    finishingLevel: 1,
  });

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
    console.log(postProps)
    setPostProps({ ...postProps, [name]: value });
  };
  const { mutate } = api.createCampaignPost.useMutation({
    onSuccess: () => {
      toast.success("Post Created")
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to Create")
    },
  });

  const handleCreatePost = () => {
    if (postProps.title !== "" && postProps.description !== "") {
      mutate({
        userId: userId,
        campaignId,
        players: postProps.players,
        startingLevel: postProps.startingLevel,
        finishingLevel: postProps.finishingLevel,
        title: postProps.title,
        description: postProps.description,
        author: username!,
        body: postProps.body,
        mainImage: imageFile ? imageFile : "",
      });
    }
  };

  return (
    <div className="flex h-[600px] max-h-[1200px] w-full flex-col bg-black lg:flex-row">
      <Toaster position="top-center"/>
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
            value={postProps.title}
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
            value={postProps.body}
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
                id="startingLevel"
                value={postProps.startingLevel}
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
                id="finishingLevel"
                value={postProps.finishingLevel}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-white">Players</Label>
              <Input
                className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                type="number"
                id="players"
                value={postProps.players}
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
      T</div>
    </div>
  );
}

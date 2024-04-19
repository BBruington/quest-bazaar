"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { upsertCampaignPost } from "../actions";
import { UploadButton } from "~/utils/uploadthing";
import { Campaign, Post } from "@prisma/client";
import { Textarea } from "~/components/ui/textarea";

export default function CreatePostComponent(props: {
  userId: string;
  username: string | undefined;
  campaignId: Campaign["id"];
  campaignPost: Post | null
}) {
  const { userId, username, campaignId, campaignPost } = props;

  const [postChecker, setPostChecker] = useState({
    title: false,
    description: false,
  });
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [postProps, setPostProps] = useState({
    title: campaignPost?.title ? campaignPost?.title : "",
    description: campaignPost?.description ? campaignPost?.description : "",
    body: campaignPost?.body ? campaignPost?.body : "",
    players: campaignPost?.players ? campaignPost?.players : 0,
    startingLevel: campaignPost?.startingLevel ? campaignPost?.startingLevel : 1,
    finishingLevel: campaignPost?.finishingLevel ? campaignPost?.finishingLevel : 1,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === "players" ||
      name === "startingLevel" ||
      name === "finishingLevel"
    ) {
      setPostProps({ ...postProps, [name]: Number(value) });
    } else {
      setPostProps({ ...postProps, [name]: value });
    }
  };

  const handleUpsertPost = async () => {
    if (postProps.title === "" || postProps.description === "") {
      if (postProps.title === "" && postProps.description === "") {
        setPostChecker({ description: true, title: true });
        return;
      } else {
        if (postProps.title === "")
          setPostChecker({ ...postChecker, title: true });
        if (postProps.description === "") {
          setPostChecker({ ...postChecker, description: true });
        }
        return;
      }
    }
    const response = await upsertCampaignPost({
      userId: userId,
      campaignId,
      players: postProps.players,
      startingLevel: postProps.startingLevel,
      finishingLevel: postProps.finishingLevel,
      title: postProps.title,
      description: postProps.description,
      author: username!,
      body: postProps.body,
      mainImage: imageUrl ? imageUrl : "",
    });
    if (response?.status === "SUCCESS") {
      toast.success(`${response.message}`);
    } else {
      toast.error("Something went wrong creating the post. Please try again.");
    }
  };

  return (
    <div className="flex h-[600px] max-h-[1200px] w-full flex-col bg-black lg:flex-row">
      <Toaster position="top-center" />
      <div className="flex w-full flex-col">
        <div className="mx-2">
          <Label className="text-white" htmlFor="title">
            Title:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="title"
            name="title"
            value={postProps.title}
            onChange={handleChange}
          />
          {postChecker.title && (
            <span className="text-red-500">Please give the post a name</span>
          )}
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
          {postChecker.description && (
            <span className="text-red-500">
              Please give the post a description
            </span>
          )}
        </div>
        <div className="mx-2 mb-1">
          <Label className="text-white" htmlFor="body">
            Body:
          </Label>
          <Textarea
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            id="body"
            name="body"
            value={postProps.body}
            onChange={handleChange}
          />
        </div>
        <div className="mx-2 mb-1">
          <Label className="text-white" htmlFor="imageUrl">
            Image:
          </Label>
          <UploadButton
            className="h-10 rounded-sm bg-primary"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
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
                name="startingLevel"
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
                name="finishingLevel"
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
                name="players"
                id="players"
                value={postProps.players}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="m-2 flex justify-between gap-5">
          <Button className="w-30 h-10" onClick={handleUpsertPost}>
            {campaignPost === null ? "Create Post" : "Update Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}

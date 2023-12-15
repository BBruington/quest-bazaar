"use client";
import type { Post } from "~/app/types/Posts";
import { api } from "~/utils/trpc";
import { Button } from "~/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function CampaignPost(props: {
  postData: Post;
  userId: string;
}) {
  const { postData, userId } = props;

  const requestInviteToCampaign = api.requestInviteToCampaign.useMutation({
    onSuccess: () => toast.success("Request sent successfully"),
  });

  const [sentRequest, setSentRequest] = useState(false);

  const handleInviteToCampaign = () => {
    if (sentRequest === false) {
      requestInviteToCampaign.mutate({
        playerId: userId,
        campaignId: postData.id,
      });
      setSentRequest(true)
    } else {
      toast.error("Request was already sent")
    }
  };

  return (
    <div className="m-5 flex w-full flex-col justify-center bg-accent-foreground">
      <Toaster position="top-center" />
      <img
        className="h-40 w-full object-cover"
        src={
          postData.mainImage
            ? postData.mainImage
            : "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
        }
        alt="post main image"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mb-3 mt-8 p-2 text-4xl text-slate-300">
          {postData.title}
        </h1>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-extralight text-slate-300">
            By: <span className="text-green-300">{postData.author}</span> -
            Published at {new Date().toLocaleString()}
          </p>
        </div>
      </article>
      <div className="m-2 mt-5 flex items-center justify-around">
        <div className="flex w-full flex-col space-y-5 rounded-lg bg-slate-800 pt-5 lg:w-2/3 xl:w-1/2">
          <div className="ml-2 flex flex-col space-y-1 text-slate-300">
            <span>{postData.players} Players</span>
            <div>
              from <span>level {postData.startingLevel}</span> to{" "}
              <span>level {postData.finishingLevel}</span>
            </div>
          </div>
          <div className="mx-2 py-5 text-slate-300">{postData.description}</div>
          <div className="flex justify-center">
            <Button className="mb-1 h-10 w-40" onClick={handleInviteToCampaign}>
              Join
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center rounded-lg bg-accent-foreground text-slate-300">
        <div className=" m-3 flex w-full rounded-lg bg-foreground p-2 lg:w-2/3 xl:w-1/2">
          {postData.body}
        </div>
      </div>
    </div>
  );
}

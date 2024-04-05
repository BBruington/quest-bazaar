"use client";
import { Button } from "~/components/ui/button";
import { requestInviteToCampaign } from "../actions";
import { useState } from "react";
import { Post } from "@prisma/client";
import SmallSpinner from "~/components/spinner/small-spinner";

export default function JoinButton(props: { toast; post: Post; userId }) {
  const { toast, post, userId } = props;
  let sentRequest = false;

  const [isLoading, setIsLoading] = useState(false)

  const handleInviteToCampaign = async () => {
    setIsLoading(true)
    if (sentRequest === false) {
      const response = await requestInviteToCampaign({
        userId: userId,
        campaignId: post.campaignId,
        postId: post.id,
      });
      sentRequest = true;
      if (response?.status === "SUCCESS") {
        toast.success(`${response.message}`);
      } else {
        toast.error(`${response?.message}`);
      }
    } else {
      toast.error("Request was already sent");
    }
    setIsLoading(false)
  };
  return (
      <Button disabled={isLoading} className="mb-1 h-10 w-40" onClick={handleInviteToCampaign}>
        {isLoading ? <SmallSpinner /> : 'Join'}
      </Button>
  );
}

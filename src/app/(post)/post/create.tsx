"use client";
import { useUser } from "@clerk/nextjs";
import { Campaign, Post } from "@prisma/client";

//components
import CreatePostComponent from "~/app/(post)/post/_components/create-post";

export default function PostCreator(props: { campaignPost: Post | null, campaignId: Campaign["id"] }) {
  const { campaignId, campaignPost } = props;
  const user = useUser();
  if (!user.user?.id || user.user.username === null)
    return <div>failed to find user...</div>;

  return (
    <CreatePostComponent
      userId={user.user.id}
      username={user.user.username}
      campaignId={campaignId}
      campaignPost={campaignPost}
    />
  );
}

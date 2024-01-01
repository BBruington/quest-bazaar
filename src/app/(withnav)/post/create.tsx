"use client";
import CreatePostComponent from "~/components/post/createPost";
import { useUser } from "@clerk/nextjs";

export default function PostCreator(props: {campaignId: string}) {
  const {campaignId} = props;
  const user = useUser();
  if (!user.user?.id || user.user.username === null)
    return <div>failed to find user...</div>;

  return (
    <CreatePostComponent userId={user.user.id} username={user.user.username} campaignId={campaignId} />
  );
}

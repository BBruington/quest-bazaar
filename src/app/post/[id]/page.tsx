"use client";
import { api } from "../../../utils/trpc";
import { useUser } from "@clerk/nextjs";
import CampaignPost from "../../../components/post/post";

export default function Post({ params }: { params: { id: string } }) {
  const { data: post, isLoading: postLoading } = api.querySinglePost.useQuery({
    postId: params.id,
  });
  const { user } = useUser();

  if (postLoading) return <div>loading...</div>;
  if (!post) return <div>error fetching post</div>;
  if (!user) return null;

  return (
    <CampaignPost postData={post} userId={user.id} />
  );
}

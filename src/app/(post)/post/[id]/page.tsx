import { prisma } from "~/utils/context";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";
import { type Post } from "@prisma/client";

//components
import Spinner from "~/components/spinner/spinner";
import CampaignPost from "~/app/(post)/post/_components/single-post";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
      likes: true,
    },
  });
  return posts.map((post) => ({ id: post.id }));
}

export default async function Post({ params }: { params: { id: Post["id"] } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      comments: true,
      likes: true,
    },
  });
  const { userId } = auth();
  if (!post) return <div>error fetching post</div>;
  if (!userId) return <div>failed to fetch user</div>;

  return (
    <Suspense fallback={<Spinner />}>
      <CampaignPost post={post} userId={userId} />
    </Suspense>
  );
}

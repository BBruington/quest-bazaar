import { prisma } from "~/utils/context";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

//components
import Spinner from "~/components/spinner/spinner";
import CampaignPost from "~/components/post/singlePost";

export default async function Post({ params }: { params: { id: string } }) {
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
      <CampaignPost postData={post} userId={userId} />
    </Suspense>
  );
}

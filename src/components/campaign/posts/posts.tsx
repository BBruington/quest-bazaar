import { prisma } from "~/utils/context";
import type { Campaign } from "@prisma/client";
import Link from "next/link";
// model Post {
//   id          String    @id @default(cuid())
//   userId      String
//   title       String
//   description String
//   author      String
//   mainImage   String
//   body        String
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   user        User      @relation(fields: [userId], references: [id])
//   likes       Like[]
//   comments    Comment[]
// }
//header
//content
//comment section

export default async function Posts(props: { campaignData: Campaign }) {
  const { campaignData } = props;
  const postData = await prisma.post.findMany({
    where: { campaignId: campaignData.id },
  });
  if (!postData) return <div>failed to load posts...</div>;
  return (
    <>
      <div className="h-30 flex justify-around">
        <Link
          className="my-5 w-1/6 whitespace-nowrap rounded-md bg-accent-foreground px-5 py-3 text-center text-white hover:bg-gray-700 lg:py-4"
          href={`/myCampaigns/create`}
        >
          Create
        </Link>
      </div>
      {postData && postData.length !== 0 && (
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
          {postData?.map((post) => (
            <Link className="" key={post.id} href={`/post/${post.id}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={`${
                    post.mainImage
                      ? post.mainImage
                      : "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                  }`}
                  alt="Campaign main image"
                />
                <div className="flex justify-between bg-accent-foreground p-5 ">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {post.title.substring(0, 30)}
                    </p>
                    <div className="flex space-x-5">
                      <p className="flex text-xs text-white">
                        {post.author ? <>By: {post.author}</> : <></>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {postData.length === 0 && (
        <div>There have not been any posts created</div>
      )}
    </>
  );
}

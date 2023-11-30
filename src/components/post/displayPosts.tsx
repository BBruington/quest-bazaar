"use client";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { api } from "../../utils/trpc";

export default function DisplayPosts() {
  const { data: campaignPosts, isLoading: loadingPosts } = api.queryCampaignPosts.useQuery();

  if(loadingPosts) return <div className="text-white flex justify-center items-center"><Loader2 className="h-32 w-32 animate-spin"/></div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 items-center gap-3 p-3 md:gap-6 md:p-6 lg:grid-cols-2 2xl:grid-cols-3">
        {campaignPosts?.map((post) => (
          <Link className="w-full" key={post.id} href={`/post/${post.id}`}>
            <div className="border-primary-foregroun group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src="https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                alt="Post main image"
              />
              <div className="flex justify-between bg-accent-foreground p-5 ">
                <div>
                  <p className="text-lg font-bold text-white">
                    {post.title.substring(0, 30)}
                  </p>
                  <div className="flex space-x-5">
                    <p className="flex text-xs text-white">
                      <>By: {post.author}</>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-white">
                    Levels <span>{post.startingLevel} </span> to{" "}
                    <span>{post.finishingLevel}</span>
                  </p>
                  <p className="text-white">
                    Looking for {post.players ? post.players : "any"} players
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {campaignPosts?.length === 0 || campaignPosts === null ? (
        <div className="text-white">
          There seems to be an issue finding any posts...
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

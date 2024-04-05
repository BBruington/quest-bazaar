
import toast, { Toaster } from "react-hot-toast";

//components
import JoinButton from "./join-button";
import { Post } from "@prisma/client";

export default async function CampaignPost(props: {
  post: Post;
  userId: string;
}) {
  const { post, userId } = props;

  return (
    <div className="m-5 flex w-full flex-col justify-center bg-accent-foreground">
      <Toaster position="top-center" />
      <img
        className="h-40 w-full object-cover"
        src={
          post.mainImage
            ? post.mainImage
            : "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
        }
        alt="post main image"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mb-3 mt-8 p-2 text-4xl text-slate-300">
          {post.title}
        </h1>

        <div className="flex items-center justify-center space-x-2">
          <p className="text-center text-sm font-extralight text-slate-300">
            By: <span className="text-green-300">{post.author}</span> -
            Published at {post.updatedAt.toLocaleString()}
          </p>
        </div>
      </article>
      <div className="m-2 mt-5 flex items-center justify-around">
        <div className="flex w-full flex-col space-y-5 rounded-lg bg-slate-800 pt-5 lg:w-2/3 xl:w-1/2">
          <div className="ml-2 flex flex-col space-y-1 text-slate-300">
            <span>{post.players} Players</span>
            <div>
              from <span>level {post.startingLevel}</span> to{" "}
              <span>level {post.finishingLevel}</span>
            </div>
          </div>
          <div className="mx-2 py-5 text-slate-300">{post.description}</div>
          <div className="flex justify-center">
            <JoinButton toast={toast} post={post} userId={userId} />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center rounded-lg bg-accent-foreground text-slate-300">
        <div className=" m-3 flex w-full rounded-lg bg-foreground p-2 lg:w-2/3 xl:w-1/2">
          {post.body}
        </div>
      </div>
    </div>
  );
}

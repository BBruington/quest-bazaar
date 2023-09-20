import { prisma } from "~/utils/context";
import type { Post } from "~/app/types/Posts";
import Link from "next/link";

export default async function Posts() {
  const posts = await prisma.userPost.findMany() 
  if ( !posts ) return <div>failed to load posts</div>
  return (
    <>
      <div className="p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="border rounded-lg group cursor-pointer overflow-hidden">
                <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={`${post.mainImage ? post.mainImage : 'https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg'}`} alt="post main image" />
                <div className='flex justify-between p-5 bg-white '>
                  <div>
                    <p className='text-lg font-bold'>{post.description.substring(0, 30)}</p>
                    <div className="flex space-x-5">
                      <p className="flex text-xs">{post.author ? <>By: {post.author}</> : <>By: John Smith</>}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
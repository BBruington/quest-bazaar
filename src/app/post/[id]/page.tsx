"use client"
import { useState } from "react"
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"

export default function Post({params}: {
  params: { id: string; };
}) {

  const {data: post, isLoading: postLoading} = api.queryPost.useQuery({id: params.id})
  const {user} = useUser();
  const [postProps, setPostProps] = useState(null)
  const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = async (data: any): void => {
  //   await fetch('/api/createComment', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   }).then(() => {
  //     setSubmitted(true);
  //   }).catch((e) => {
  //     console.error(e);
  //     setSubmitted(false);
  //   })
  // }

  if ( postLoading ) return <div>loading...</div>
  if (!post) return <div>error fetching post</div>

  if (!user) return null;

  return (
    <>
      <main>

        <img className="w-full h-40 object-cover" src={`${post.mainImage ? post.mainImage : 'https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg'}`} alt='' />
        <article className="max-w-3xl mx-auto p-5">

          <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        
          <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

          <div className="flex items-center space-x-2">

            {/* <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()} alt='' /> */}
          
            <p className="font-extralight text-sm">
              By: <span className="text-green-600">{post.author}</span> - Published at{" "} 
            {new Date(post.createdAt).toLocaleString()}</p>
          
          </div>

          <div className="mt-10">
          
          </div>
        </article>

        <hr className="max-w-lg my-5 mx-auto border border-blue-500" />
        
        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-blue-500 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold">Thank you for your comment</h3>
              <p>Once it has been approved, it will appear below.</p>
          </div>
        )
        :
        (
          <form 
          onSubmit={() => console.log("hi")}
          className="flex flex-col p-10 my-10 max-w-2xl mx-auto mb-10">
            
            {/* <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3> */}
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="py-3 my-2"></hr>

            <input 
              // {...register("_id")}
              type="hidden"
              name="_id"
              value={post.id}
            />

            <label className="block mb-5">
              <span className="text-gray-700">Name</span> {/*block elements have their own width */}
              <input 
              // {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring" 
              placeholder="John Smith" type="text" />
            </label>

            <label className="block mb-5">
              <span className="text-gray-700">Email</span>
              <input
              // {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring" 
              placeholder="email@hotmail.com" type="email" />
            </label>

            <label className="block mb-5">
              <span className="text-gray-700">Comment</span>
              <textarea 
              // {...register("comment", { required: true })}            
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-blue-500 outline-none focus:ring" 
              placeholder="Leave a comment here" rows={8}/>
            </label>

            {/* this is where errors from lack of fields validation appear */}
            <div className="flex flex-col p-5">
              {/* this is connected to register / formstate and notices the fields are required */}
              {/* {errors.name && (
                <span className="text-red-500">- The Name Field is required</span>
              )}
              {errors.comment && (
                <span className="text-red-500">- The Comment Field is required</span>
              )}
              {errors.email && (
                <span className="text-red-500">- The Email Field is required</span>
              )} */}
            </div>

            <input 
            type="submit" 
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer" 
            />

          </form>

        )}

        {/* Comments are here */}

        {/* <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />

          {post.comments[0] ? (post.comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className="text-yellow-500">{comment.name}: </span>{comment.comment}
              </p>
            </div>
          )))
        :
        (
          <div>Wow such empty comments</div>
        )}
        </div> */}

      </main>
    </>
  )
}
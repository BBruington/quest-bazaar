"use client"
import { useState } from "react"
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function Post({params}: {
  params: { id: string; };
}) {

  const {data, isLoading: postLoading} = api.queryPost.useQuery({id: params.id})
  const {user} = useUser();
  const [postProps, setPostProps] = useState(data)

  if ( postLoading ) return <div>loading...</div>
  if (!data) return <div>error fetching post</div>

  if (!user) return null;


  console.log(postProps)

  return (
    <>
      <div>post page</div>  
    </>
  )
}
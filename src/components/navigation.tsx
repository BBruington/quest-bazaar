'use client'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navigation() {
  const {user} = useUser();
  if (!user) return <></>

  return (
    <>
    <div className="h-17 my-3 pb-3 mx-auto px-5 flex items-center justify-between border-b-2 border-accent-foreground border-gray text-primary">
      <Link className="hover:text-primary-foreground" href={`/`}>Home</Link>
      <Link href={`/myCampaigns`}>My Campaigns</Link>
      <div className="flex space-x-2">
        {user && <div>{user.username}</div>}
        <Link href={`/messages`}>Messages</Link>
        <UserButton />
      </div>
    </div>
    </>
  )
}
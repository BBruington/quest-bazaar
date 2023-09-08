'use client'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navigation() {
  const {user} = useUser();

  return (
    <>
    <div className="h-17 my-3 pb-3 mx-auto px-5 flex items-center justify-between">
      <Link href={`/`}>Home</Link>
      <Link href={`/myCampaigns`}>My Campaigns</Link>
      <div className="flex space-x-2">
        {user && <div>{user.username}</div>}
        <UserButton />
      </div>
    </div>
    </>
  )
}
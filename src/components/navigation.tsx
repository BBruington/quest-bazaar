'use client'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Navigation() {
  const {user} = useUser();

  return (
    <>
    <div className="h-17 my-3 pb-3 mx-auto px-5 flex items-center justify-between">
      <div>item 1</div>
      <div>item 2</div>
      <div className="flex space-x-2">
        {user && <div>{user.username}</div>}
        {/* <UserButton /> */}
      </div>
    </div>
    </>
  )
}
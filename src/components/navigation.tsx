"use client"; 
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navigation() {
  const { user } = useUser();
  if (!user)
    return (
      <nav className="h-17 border-gray mx-auto my-3 flex items-center justify-between border-b-2 border-accent-foreground bg-accent-foreground px-5 py-2 text-primary">
        <div className="text-primary">Home</div>
        <div className="text-primary">My Campaigns</div>
        <div className="flex space-x-2">
          <div>...</div>
        </div>
      </nav>
    );

  return (
    <nav className="h-17 border-gray mx-auto my-3 flex items-center justify-between border-b-2 border-accent-foreground bg-accent-foreground px-5 py-2 text-primary">
      <Link className="text-primary hover:text-primary-foreground" href={`/`}>
        Home
      </Link>
      <Link
        className="text-primary hover:text-primary-foreground"
        href={`/myCampaigns`}
      >
        My Campaigns
      </Link>
      <div className="flex items-center space-x-2">
        {user && <div>{user.username}</div>}
        <Link
          className="text-primary hover:text-primary-foreground"
          href={`/messages`}
        >
          Messages
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}

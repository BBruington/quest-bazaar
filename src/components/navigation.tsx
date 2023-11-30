"use client";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MessageSquare } from 'lucide-react';

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
        <Link
          className="text-primary hover:text-primary-foreground flex"
          href={`/messages`}
        >
          {user.username} <MessageSquare className="ml-2" />
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}

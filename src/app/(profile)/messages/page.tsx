"use client";
import { useUser } from "@clerk/nextjs";

//components
import MyMessages from "./_components/my-messages";

export default function Messages() {
  const user = useUser();
  if (!user.user?.id) return <div>failed to load user</div>;
  return <MyMessages userId={user.user?.id} />;
}

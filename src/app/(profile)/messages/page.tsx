import { currentUser } from "@clerk/nextjs";
//components
import MyMessages from "./_components/my-messages";

export default async function Messages() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;
  
  return (
    <>
      <MyMessages userId={user.id} username={user.username}/>;
    </>
  );
}

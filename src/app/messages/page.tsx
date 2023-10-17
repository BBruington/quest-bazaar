import MyMessages from "~/components/myMessages";
import {prisma} from "../../utils/context";
import {auth} from "@clerk/nextjs"

export default async function Messages() {

  const { userId } = auth();
  if ( !userId ) return <div>failed to get user</div>

  const messages = await prisma.message.findMany({
    where: {
      OR:
        [{
          senderId: userId
        },
        {
          recipientId: userId
         }]
      },
      orderBy: {
        sentAt: 'asc'
      }
    })
  
  return <> 
    <MyMessages messages={messages} />
  </>
}
import MyMessages from "~/components/myMessages";
import {prisma} from "../../utils/context";
import {auth} from "@clerk/nextjs"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
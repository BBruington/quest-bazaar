import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import type { SelectedFriend } from "~/app/types/Message"

export default function SelectedFriend(props: {selectedFriend: SelectedFriend}) {
  const {selectedFriend} = props;

  return (
    <div className="w-1/6">
      <div className="flex items-center justify-center h-60 bg-accent-foreground mx-2">
        <div className="flex flex-col items-center justify-top bg-foreground w-5/6 h-4/6">
          <div className="text-white mt-5">
            <Avatar>
              <AvatarImage className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-white mt-1">{selectedFriend.senderName}</div>
          <div className="flex justify-center mt-auto mb-5">
            <Button className="mr-5 w-1/3">Invite</Button>
            <Button variant="destructive" className="px-none w-1/3">Remove</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
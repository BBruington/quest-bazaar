import { prisma } from "~/utils/context";
import { Mail, User, Plus, PersonStandingIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";

//components
import CharacterSheets from "./character-sheets";
import DisplayMessages from "./display-messages";
import FriendRequest from "./friend-requests";
import CampaignInvite from "./campaign-invites";
import SelectedFriend from "./selected-friend";
import AddFriendInput from "./add-friend-input";
import FriendsList from "./friends-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default async function MyMessages(props: {
  userId: string;
  username: string | null;
}) {
  const { userId, username } = props;
  let selectedFriend = {
    id: "",
    status: "",
    receiverName: "",
    receiverId: "",
    receiverImgUrl: null,
    senderName: "",
    senderId: "",
    senderImgUrl: null,
    createdAt: "",
    updatedAt: "",
  };

  const myFriends = await prisma.friendship.findMany({
    where: {
      OR: [
        {
          receiverId: userId,
        },
        {
          senderId: userId,
        },
      ],
      AND: [
        {
          status: "ACCEPTED",
        },
      ],
    },
  });

  const userData = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      characters: true,
      invitedCampaigns: true,
      receivedFriendRequests: true,
    },
  });
  const receivedFriendRequests = userData?.receivedFriendRequests.filter(
    (friend) => friend.receiverId === userId && friend.status === "PENDING"
  );
  let notificationsAmount = 0;
  if (userData?.invitedCampaigns && receivedFriendRequests)
    notificationsAmount =
      userData?.invitedCampaigns.length + receivedFriendRequests.length;

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex h-screen flex-col bg-foreground sm:flex-row">
        <div className="mx-2 flex w-full flex-col sm:w-1/3 lg:w-1/6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Add Friend</span>{" "}
                  <Plus className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AddFriendInput
                  userId={userId}
                  username={username ? username : ""}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Friends</span>{" "}
                  <User className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  {!myFriends || myFriends.length === 0 ? (
                    <span className="text-slate-400">Empty</span>
                  ) : (
                    <></>
                  )}
                  {myFriends?.map((friend) => (
                    <FriendsList
                      key={friend.id}
                      friend={friend}
                      userId={userId}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Notifications</span>{" "}
                  <Mail className="invisible sm:visible sm:ml-2" />
                </div>
                <span
                  className={`${
                    notificationsAmount > 0
                      ? "h-4 w-4 items-center rounded-full bg-red-600 text-xs text-white"
                      : ""
                  }`}
                >
                  {notificationsAmount === 0 ? null : notificationsAmount}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {/* UserNotifications */}
                  {receivedFriendRequests &&
                    userData?.invitedCampaigns &&
                    receivedFriendRequests?.length +
                      userData?.invitedCampaigns.length ===
                      0 && (
                      <div className="flex justify-center text-white">
                        Empty
                      </div>
                    )}
                  {receivedFriendRequests?.map((friendRequest) => (
                    <div key={friendRequest.id}>
                      <div className="flex border-b border-white pb-3 md:flex-col">
                        <span className="mb-1 flex justify-center text-sm">
                          {friendRequest.senderName} would like to be Friends
                        </span>
                        <div className="mt-1 flex flex-col justify-around md:flex-row">
                          <FriendRequest
                            userId={userId}
                            notification={friendRequest}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {userData?.invitedCampaigns?.map((campaign) => (
                    <div key={campaign.id}>
                      <div className="flex border-b border-white pb-3 md:flex-col">
                        <div>
                          <span>
                            You have been invited to join {campaign.name}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col justify-around md:flex-row">
                          <CampaignInvite
                            userId={userId}
                            notification={campaign}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex justify-center hover:text-slate-200 sm:justify-start">
                <div className="flex sm:w-2/3 sm:justify-between">
                  <span>Characters</span>{" "}
                  <PersonStandingIcon className="invisible sm:visible sm:ml-2" />
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <CharacterSheets
                  charactersheets={userData?.characters}
                  userId={userId}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {selectedFriend.id !== "" && selectedFriend.receiverId === userId ? (
            <div
              className={
                selectedFriend.id === ""
                  ? "invisible h-0"
                  : "visible mb-1 mt-8 flex h-0 items-center justify-center space-x-2 sm:invisible"
              }
            >
              <Avatar className={selectedFriend.id === "" ? "invisible" : ""}>
                <AvatarImage
                  src={
                    selectedFriend.receiverId === userId
                      ? selectedFriend.senderImgUrl!
                      : selectedFriend.receiverImgUrl!
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-white">{selectedFriend.senderName}</span>
            </div>
          ) : (
            <div
              className={
                selectedFriend.id === ""
                  ? "invisible h-0"
                  : "visible mb-1 mt-8 flex h-0 items-center justify-center space-x-2 sm:invisible"
              }
            >
              <Avatar>
                <AvatarImage
                  src={
                    selectedFriend.receiverId === userId
                      ? selectedFriend.senderImgUrl!
                      : selectedFriend.receiverImgUrl!
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-white">{selectedFriend.receiverName}</span>
            </div>
          )}
          <div className="invisible mt-5 flex h-0 w-full sm:visible sm:h-60 lg:invisible lg:h-0">
            <SelectedFriend userId={userId} />
          </div>
        </div>

        <DisplayMessages userId={userId} />
        <div className="invisible w-0 lg:visible lg:w-1/6">
          <SelectedFriend userId={userId} />
        </div>
      </div>
    </>
  );
}

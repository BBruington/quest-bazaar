import { currentUser } from "@clerk/nextjs";
import { prisma } from "~/utils/context";
import CreateCampaignForm from "./_components/create-campaign-form";

export default async function CreateCampaign() {
  const userData = await currentUser();
  
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userData?.id
    }
  })
  if (!userData?.id || !userData?.username || !user) return <div>failed to load user...</div>;


  

  const friendsList = await prisma.friendship.findMany({
    where: {
      OR: [
        {
          receiverId: user?.clerkId,
        },
        {
          senderId: user?.clerkId,
        },
      ],
      AND: [
        {
          status: "ACCEPTED",
        },
      ],
    },
  });
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <CreateCampaignForm friendsList={friendsList} user={user}/>
      {/* <div className="flex w-full flex-col p-8 lg:w-1/2">
        <div className="ml-2">
          <Label className="text-white" htmlFor="name">
            Campaign Name:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="name"
            name="name"
            value={campaignProps.name}
            onChange={handleChange}
          />
          {campaignChecker.name && (
            <span className="text-red-500">Please give the post a name</span>
          )}
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white" htmlFor="description">
            Description:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            id="description"
            name="description"
            value={campaignProps.description}
            onChange={handleChange}
          />
          {campaignChecker.description && (
            <span className="text-red-500">
              Please give the post a description
            </span>
          )}
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white" htmlFor="description">
            Image:
          </Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImageFile}
          />
        </div>
        <div className="mb-2 ml-2">
          <Label className="text-white">Imgage Url</Label>
          <Input
            className="border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            type="text"
            id="imageUrl"
            value={imageFile ? imageFile : undefined}
            onChange={handleChange}
          />
        </div>
        <div className="m-2 flex justify-between gap-5">
          <Button className="w-30 h-10" onClick={handleCreateCampaign}>
            Create Campaign
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 w-40 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Invite Friends
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Friends</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {friends ? (
                friends.map((friend, index) => (
                  <DropdownMenuItem
                    onClick={() => inviteFriendToCampaign(friend)}
                    key={index}
                  >
                    {friend.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <></>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center p-3 lg:w-1/2">
        <h1 className="mb-5 w-full text-center text-2xl text-white">Preview</h1>
        <div className="group cursor-pointer items-center overflow-hidden rounded-md border border-primary-foreground lg:w-4/6 xl:w-1/2">
          <img
            className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            src={`${
              imageFile === "" || imageFile === undefined
                ? "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                : imageFile
            }`}
            alt="Campaign main image"
          />
          <div className="flex justify-between bg-accent-foreground p-5 ">
            <div>
              <p className="text-lg font-bold text-white">
                {campaignProps.name !== undefined ? (
                  campaignProps.name.substring(0, 30)
                ) : (
                  <></>
                )}
              </p>
              <div className="flex space-x-5">
                <p className="flex text-xs text-white">
                  {user.username ? (
                    <>By: {user.username}</>
                  ) : (
                    <>By: John Smith</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center text-white">
          <span className="text-lg font-bold">Friends Invited:</span>
          <div className="space-x-4">
            {campaignProps.friends[0]?.name !== "" &&
              campaignProps.friends[0]?.name !== undefined &&
              campaignProps.friends.map((friend, index) => (
                <DropdownMenu key={friend.id}>
                  <DropdownMenuTrigger className="inline-flex h-10 w-40 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    {friend.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-blue-900 ">
                    <DropdownMenuItem
                      className=" bg-blue-900 text-white hover:bg-primary-foreground"
                      onClick={() => removeFriend(index)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

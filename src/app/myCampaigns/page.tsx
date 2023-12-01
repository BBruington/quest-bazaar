"use client";
import { api } from "../../utils/trpc";
import Spinner from "../../components/spinner/spinner";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function MyCampaigns() {
  const { user } = useUser();
  if (!user) return null;
  const { data, isLoading: campaignsLoading } = api.queryUserCampaigns.useQuery(
    { id: user.id }
  );
  if (campaignsLoading) return <Spinner />;
  if (!data) return <div className="text-white">error fetching campaigns</div>;
  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold text-white">
        Your Current Games
      </h1>
      <div className="h-30 flex justify-around">
        <Link
          className="my-5 w-1/2 whitespace-nowrap rounded-md bg-blue-800 px-5 py-3 text-center text-white hover:bg-blue-700 md:w-1/6 lg:py-4"
          href={`/myCampaigns/create`}
        >
          Create New
        </Link>
      </div>
      {!campaignsLoading && data.length !== 0 && (
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
          {data?.map((campaign) => (
            <Link
              className=""
              key={campaign.id}
              href={`/myCampaigns/${campaign.id}`}
            >
              <div className="group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={`${
                    campaign.image!
                      ? campaign.image
                      : "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"
                  }`}
                  alt="Campaign main image"
                />
                <div className="flex justify-between bg-accent-foreground p-5 ">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {campaign.name.substring(0, 30)}
                    </p>
                    <div className="flex space-x-5">
                      <p className="flex text-xs text-white">
                        {campaign.dmName ? (
                          <>By: {campaign.dmName}</>
                        ) : (
                          <>By: John Smith</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {data.length === 0 && (
        <div>
          It seems you arent a part of a campaign. Please either join or create
          a campaign to display your games here.
        </div>
      )}
    </>
  );
}

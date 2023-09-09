'use client'
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"
import Link from "next/link";

export default function MyCampaigns() {
  const { user } = useUser()
  if (!user) return null;
  const {data, isLoading: campaignsLoading} = api.queryUserCampaigns.useQuery({id: user.id})
  if ( campaignsLoading ) return <div>loading...</div>
  if (!data) return <div>error fetching campaigns</div>
  return (
    <>
    <div className="flex justify-around">
      <Link href={`/myCampaigns/create`}>Create</Link>
      <button className="hover:disabled" disabled>Join</button>
    </div>
    {!campaignsLoading && data.length !== 0 && (
      <div className="p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
        {data?.map((campaign) => (
          <Link key={campaign.id} href={`/myCampaigns/${campaign.id}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              {campaign.image && (
                <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={campaign.image as string} alt="" />
              )}
              <div className='flex justify-between p-5 bg-white '>
                <div>
                  <p className='text-lg font-bold'>{campaign.name}</p>
                  <p>{campaign.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
    {data.length === 0 && (
      <div>It seems you arent a part of a campaign. Please either join or create a campaign to display your games here.</div>
    )}
    </>
  )
}
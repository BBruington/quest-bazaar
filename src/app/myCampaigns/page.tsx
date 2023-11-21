'use client'
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"
import Link from "next/link";

export default function MyCampaigns() {
  const { user } = useUser()
  if (!user) return null;
  const {data, isLoading: campaignsLoading} = api.queryUserCampaigns.useQuery({id: user.id})
  if ( campaignsLoading ) return <div className="text-white">loading...</div>
  if (!data) return <div className="text-white">error fetching campaigns</div>
  return (
    <>
    <div className="h-30 flex justify-around"> 
      <Link className="my-5 lg:py-4 bg-accent-foreground text-white py-3 px-5 rounded-md hover:bg-gray-700 whitespace-nowrap w-1/6 text-center" href={`/myCampaigns/create`}>Create</Link>
      {/* <button className="my-5 lg:py-4  bg-accent-foreground text-white py-3 px-5 rounded-md hover:bg-gray-700 whitespace-nowrap w-1/6 text-center hover:disabled" disabled>Join</button> */}
    </div>
    {!campaignsLoading && data.length !== 0 && (
      <div className="p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
        {data?.map((campaign) => (
          <Link className="" key={campaign.id} href={`/myCampaigns/${campaign.id}`}>
            <div className="border border-primary-foreground rounded-lg group cursor-pointer overflow-hidden">
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={`${campaign.image! ? campaign.image : 'https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg'}`} alt="Campaign main image" />
              <div className='flex justify-between p-5 bg-accent-foreground '>
                <div>
                  <p className='text-lg font-bold text-white'>{campaign.name.substring(0, 30)}</p>
                  <div className="flex space-x-5">
                    <p className="flex text-xs text-white">{campaign.dmName ? <>By: {campaign.dmName}</> : <>By: John Smith</>}</p>
                  </div>
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
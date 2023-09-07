'use client'
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"
import Link from "next/link";

export default function MyCampaigns() {
  const { user } = useUser()
  console.log("user", user)
  if (!user) return null;
  const {data, isLoading: campaignsLoading} = api.queryUserCampaigns.useQuery({id: user.id})
  if ( campaignsLoading ) return <div>loading...</div>
  if (!data) return <div>error fetching campaigns</div>
  console.log("data", data)
  return (
    <>
    {!campaignsLoading && data.length !== 0 && (
      <div className="p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
        {data?.map((campaign) => (
          <Link key={campaign.id} href={`/myCampaigns/${campaign.id}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{campaign.name}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
    </>
  )
}
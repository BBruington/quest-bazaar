import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

export default function MyCampaigns() {
  
  const { user } = useUser()
  if (!user) return null;
  const {data, isLoading: campaignsLoading} = api.user.queryUserCampaigns.useQuery({id: user.id})

  return (
    <>
      {campaignsLoading && <div>loading...</div>}
      {!campaignsLoading && data!== undefined &&(
        <div className="flex  justify-around">
          {data?.map((campaign) => (<div key={campaign.id} className="flex">
            {campaign.name}
          
          </div>))}
        </div>
      )}
    </>
  )
}
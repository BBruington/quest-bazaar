"use client"
import { useState } from "react"
import type { ChangeEvent } from "react";
import { api } from "~/utils/trpc"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function CreateCampaign() {
  const {user} = useUser();
  const router = useRouter()
  const [campaignProps, setCampaignProps] = useState({
    name: "",
    description: ""
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaignProps({ ...campaignProps, [name]: value });
  };

  const { mutate } = api.createCampaign.useMutation({
    onSuccess: () => {
      void router.push(`/myCampaigns`)
    },
    onError: (e) => {
      console.error(e)
    }
  })

  return (
    <>
    <div>
      {/* <div>
        <label htmlFor="name">Campaign Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={campaignProps.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={campaignProps.description}
          onChange={handleChange}
        />
      </div>
      <button onClick={(e) => {
      e.preventDefault(); 
      if( campaignProps.name !== "" && campaignProps.description !== ""){
        mutate({
        id: user!.id,
        name: campaignProps.name,
        description: campaignProps.description
        })
      }}}>Create Campaign
    </button> */}

    
    </div>
    </>
  )
}
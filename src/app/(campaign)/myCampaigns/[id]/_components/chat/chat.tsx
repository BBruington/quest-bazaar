"use client";

import type { CampaignChat, Campaign } from "@prisma/client";
import ChatInput from "./chat-input";
import { useState } from "react";

export default function CampaignChatComponent(props: {
  campaignProps: Campaign;
  username: string;
  userId: string;
  campaignMessages: CampaignChat[];
}) {
  const { campaignProps, username, campaignMessages } = props;

  const [campaignChat, setCampaignChat] = useState(campaignMessages);

  const newCampaignProps = {
    ...campaignProps,
    updatedAt: new Date(campaignProps.updatedAt),
    createdAt: new Date(campaignProps.createdAt),
  };

  return (
    <div className="flex h-5/6 w-5/6 flex-col self-center rounded-md bg-accent-foreground p-2 lg:w-4/6 lg:self-start">
      <div className="mt-auto flex flex-col-reverse overflow-y-auto">
        {campaignChat.map((message, index) => (
          <div key={message.id} className="mb-1 bg-accent-foreground p-2">
            {message.username === username ? (
              <>
                <div className="flex justify-end text-right" key={message.id}>
                  <span className="mt-1 rounded-md bg-blue-500 p-2 text-black">
                    {message.chat}
                  </span>
                </div>
                {campaignChat[index - 1]?.username !==
                  campaignChat[index].username && (
                  <span className="flex justify-end rounded-md p-2 pr-1 text-xs text-slate-500">
                    {message.username}
                  </span>
                )}
              </>
            ) : (
              <>
                <div className="justify-left mb-5 mt-1 flex" key={message.id}>
                  <span className="rounded-md bg-slate-700 p-2 text-white">
                    {message.chat}
                  </span>
                </div>
                {campaignChat[index - 1]?.username !==
                  campaignChat[index].username && (
                  <span className="justify-left mb-5 rounded-md p-2 pl-1 text-xs text-slate-500">
                    {message.username}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <ChatInput
        setCampaignChat={setCampaignChat}
        username={username}
        campaignMessages={campaignMessages}
        campaignProps={newCampaignProps}
      />
    </div>
  );
}

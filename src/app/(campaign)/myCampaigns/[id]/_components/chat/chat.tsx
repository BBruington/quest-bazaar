import { CampaignChat } from "@prisma/client";
import type { Campaign } from "../types";
import ChatInput from "./chat-input";

export default function CampaignChatComponent(props: {
  campaignProps: Campaign;
  username: string;
  userId: string;
  campaignMessages: CampaignChat[];
}) {
  const { campaignProps, username, campaignMessages } = props;

  const newCampaignProps = {
    ...campaignProps,
    updatedAt: new Date(campaignProps.updatedAt),
    createdAt: new Date(campaignProps.createdAt),
  };

  return (
    <>
      <div className="flex h-5/6 w-5/6 flex-col self-center rounded-md bg-accent-foreground p-2 lg:w-4/6 lg:self-start">
        <div className="mt-auto">
          {campaignMessages.map((message, index) => (
            <div key={message.id} className="mb-1 bg-accent-foreground p-2">
              {message.username === username ? (
                <>
                  {campaignMessages[index - 1]?.username !==
                    campaignMessages[index].username && (
                    <span className="flex justify-end rounded-md p-2 pr-1 text-xs text-slate-500">
                      {message.username}
                    </span>
                  )}
                  <div className="flex justify-end text-right" key={message.id}>
                    <span className="mt-1 rounded-md bg-blue-500 p-2 text-black">
                      {message.chat}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {campaignMessages[index - 1]?.username !==
                    campaignMessages[index].username && (
                    <span className="justify-left mb-5 rounded-md p-2 pl-1 text-xs text-slate-500">
                      {message.username}
                    </span>
                  )}
                  <div className="justify-left mb-5 mt-1 flex" key={message.id}>
                    <span className="rounded-md bg-slate-700 p-2 text-white">
                      {message.chat}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
          <ChatInput username={username} campaignProps={newCampaignProps} />
        </div>
      </div>
    </>
  );
}

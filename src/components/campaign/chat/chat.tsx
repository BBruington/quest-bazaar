"use-client";
import type { Campaign } from "../types";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/trpc";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CampaignChat(props: { campaignProps: Campaign }) {
  const { campaignProps } = props;
  const { user } = useUser();
  const utils = api.useContext();
  const [inputValue, setInputValue] = useState("");
  const { mutate, isLoading: sendingMessage } = api.sendChatMessage.useMutation(
    {
      onSuccess: async () => {
        setInputValue("");
        await utils.queryCampaignMessages.invalidate();
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  const { data: campaignMessages, isLoading: loadingChat } =
    api.queryCampaignMessages.useQuery({
      campaignId: campaignProps.id,
    });
  if (!campaignMessages) return <div>failed to load friend messages</div>;
  if (!user) return <div>failed to load user...</div>;

  const handleInputChange = (e: string) => {
    setInputValue(e);
  };

  const handleSendMessage = () => {
    if (inputValue !== "" && user.username !== null) {
      mutate({
        campaignId: campaignProps.id,
        username: user.username,
        chat: inputValue,
      });
    }
  };

  return (
    <>
      {loadingChat ? (
        <div className="flex h-5/6 w-5/6 lg:w-4/6 flex-col self-center lg:self-start rounded-md bg-accent-foreground p-2">
          <div className="mt-auto">
            <div className="bg-accent-foreground p-2">
              <div className="flex justify-end text-right">
                <span className="rounded-md bg-blue-500 p-2 text-black">
                  Loading...
                </span>
              </div>
              <div className="justify-left mb-5 flex">
                <span className="rounded-md bg-slate-700 p-2 text-white">
                  Loading...
                </span>
              </div>
            </div>

            <Input
              disabled
              placeholder="Message"
              className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
            ></Input>
          </div>
        </div>
      ) : (
        <div className="flex h-5/6 w-5/6 lg:w-4/6 flex-col self-center lg:self-start rounded-md bg-accent-foreground p-2">
          <div className="mt-auto">
            {campaignMessages.map((message) => (
              <div key={message.id} className="bg-accent-foreground p-2 mb-1">
                {message.username === user.username ? (
                  <>
                    <span className="flex justify-end rounded-md p-2 pr-1 text-xs text-slate-500">
                      {message.username}
                    </span>
                    <div
                      className="flex justify-end text-right"
                      key={message.id}
                    >
                      <span className="mt-1 rounded-md bg-blue-500 p-2 text-black">
                        {message.chat}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="justify-left mb-5 rounded-md p-2 pl-1 text-xs text-slate-500">
                      {message.username}
                    </span>
                    <div
                      className="justify-left mb-5 mt-1 flex"
                      key={message.id}
                    >
                      <span className="rounded-md bg-slate-700 p-2 text-white">
                        {message.chat}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
            <Input
              placeholder="Message"
              className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
              value={inputValue}
              disabled={sendingMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

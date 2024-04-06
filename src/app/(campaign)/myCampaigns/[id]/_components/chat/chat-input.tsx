"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign, CampaignChat } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { sendChatMessage } from "../../actions";
import { Form, FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { chatMessageSchema } from "~/lib/validations/chatMessage";
import uuid from "react-uuid";

interface ChatInputProps {
  username: string;
  campaignProps: Campaign;
  campaignMessages: CampaignChat[];
  setCampaignChat: Dispatch<
    SetStateAction<
      {
        id: string;
        campaignId: string;
        username: string;
        chat: string;
        createdAt: Date;
      }[]
    >
  >;
}

export default function ChatInput({
  username,
  campaignProps,
  campaignMessages,
  setCampaignChat,
}: ChatInputProps) {
  type FormData = {
    message: string;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      message: "",
    },
  });
  const { handleSubmit, reset } = form;

  const handleSendMessage = async (message: FormData) => {
    setCampaignChat([
      {
        id: uuid(),
        campaignId: campaignProps.id,
        chat: message.message,
        username: username,
        createdAt: new Date(Date.now().toString()),
      },
      ...campaignMessages,
    ]);
    await sendChatMessage({
      campaignId: campaignProps.id,
      username: username,
      chatMessage: message.message,
    });

    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSendMessage)} className="flex">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex">
                <FormControl>
                  <Input
                    id="message"
                    {...field}
                    placeholder="Message"
                    className=" mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && field.name.length !== 0) {
                        handleSubmit(handleSendMessage);
                      }
                    }}
                  />
                </FormControl>
                {field.name.length > 0 ? (
                  <Button type="submit" className="ml-2 text-black">
                    Send
                  </Button>
                ) : (
                  <Button disabled className="ml-2 text-black">
                    Send
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

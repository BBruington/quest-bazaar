"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign } from "@prisma/client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { sendChatMessage } from "../../actions";
import { Form, FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { chatMessageSchema } from "~/lib/validations/chatMessage";

interface ChatInputProps {
  username: string;
  campaignProps: Campaign;
}

export default function ChatInput({ username, campaignProps }: ChatInputProps) {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: FormData) => {
    setIsLoading(true);
    await sendChatMessage({
      campaignId: campaignProps.id,
      username: username,
      chatMessage: message.message,
    });

    reset();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex"
      >
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
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (field.name.length !== 0) {
                          handleSubmit(handleSendMessage);
                        }
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

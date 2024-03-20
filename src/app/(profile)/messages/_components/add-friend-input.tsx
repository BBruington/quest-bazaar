"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { sendFriendRequest } from "../actions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { userNameSchema } from "~/lib/validations/user";
import { z } from "zod";

interface AddFriendInputProps {
  userId: string;
  username: string;
}

export default function AddFriendInput({
  userId,
  username,
}: AddFriendInputProps) {
  type FormData = z.infer<typeof userNameSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: "",
    },
  });
  const { handleSubmit } = form;
  const handleAddFriend = async (friendName: FormData) => {
    const response = await sendFriendRequest({
      receiverName: friendName.name,
      senderName: username,
      userId,
    });
    if (response.status === "ACCEPTED") {
      toast.success("Friend request was sent")
    } else {
      toast.error("Something went wrong. Please try again.")
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddFriend)} className="flex">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormControl>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Friend"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (field.name.length !== 0) {
                          handleSubmit(handleAddFriend);
                        }
                      }
                    }}
                    className="mt-auto border-none bg-primary text-black ring-2 ring-offset-black placeholder:text-black focus-visible:ring-accent-foreground"
                  />
                </FormControl>
                {field.name.length > 0 ? (
                  <Button type="submit" className="ml-2">
                    Add
                  </Button>
                ) : (
                  <Button disabled className="ml-2">
                    Add
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

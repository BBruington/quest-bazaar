"use client";
import { Button } from "~/components/ui/button";
import { requestInviteToCampaign } from "../actions";

export default function JoinButton(props: { toast; postData; userId }) {
  const { toast, postData, userId } = props;
  let sentRequest = false;

  const handleInviteToCampaign = async () => {
    if (sentRequest === false) {
      const response = await requestInviteToCampaign({
        userId: userId,
        campaignId: postData.id,
      });
      sentRequest = true;
      if (response?.status === "SUCCESS") {
        toast.success(`${response.message}`);
      } else {
        toast.error(`${response?.message}`);
      }
    } else {
      toast.error("Request was already sent");
    }
  };
  return (
    <Button className="mb-1 h-10 w-40" onClick={handleInviteToCampaign}>
      Join
    </Button>
  );
}

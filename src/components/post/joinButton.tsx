"use client";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/trpc";

export default function JoinButton(props: { toast; postData; userId }) {
  const { toast, postData, userId } = props;

  const requestInviteToCampaign = api.requestInviteToCampaign.useMutation({
    onSuccess: () => toast.success("Request sent successfully"),
  });
  let sentRequest = false;

  const handleInviteToCampaign = () => {
    if (sentRequest === false) {
      requestInviteToCampaign.mutate({
        playerId: userId,
        campaignId: postData.id,
      });
      sentRequest = true;
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

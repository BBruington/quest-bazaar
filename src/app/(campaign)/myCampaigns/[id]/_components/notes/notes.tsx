"use client";
import NoteList from "./note-list";
import NoteViewer from "./note-viewer";
import type { CampaignNote, Campaign } from "@prisma/client";

const NotesPage = (props: {
  campaignData: Campaign;
  campaignNotes: CampaignNote[];
  isPrivateNotes: boolean;
  myNotes: CampaignNote[];
  userId: string;
}) => {
  const { campaignData, campaignNotes, isPrivateNotes, userId, myNotes } = props;
  if (campaignNotes === undefined || myNotes === undefined)
    return <div>failed to load campaign notes</div>;

  return (
    <div className="flex">
      <NoteViewer
        campaignData={campaignData}
        isPrivateNotes={isPrivateNotes}
        userId={userId}
      />
      <NoteList
        notes={campaignNotes}
        campaignData={campaignData}
        isPrivateNotes={isPrivateNotes}
        userId={userId}
      />
    </div>
  );
};

export default NotesPage;

"use client";
import { useState } from "react";
import NoteList from "./noteList";
import NoteViewer from "./noteViewer";
import { api } from "~/utils/trpc";
import type { Campaign } from "../types";
import type { CampaignNote } from "./types";

const NotesPage = (props: {
  campaignData: Campaign;
  campaignNotes: CampaignNote[];
  privateNotes: boolean;
  userId: string;
}) => {
  const { campaignData, campaignNotes, privateNotes, userId } = props;
  const [selectedNote, setSelectedNote] = useState(campaignNotes[0]);
  const { data: privateNotesData } = api.queryCampaignPrivateNotes.useQuery({
    campaignId: campaignData.id,
    userId: userId,
  });
  if (campaignNotes === undefined || privateNotesData === undefined)
    return <div>failed to load campaign notes</div>;

  const handleNoteClick = (noteId: string): CampaignNote | boolean => {
    if (privateNotes === false) {
      const selected = campaignNotes.find((note) => note.id === noteId);
      if (selected !== undefined) {
        setSelectedNote(selected);
        if (selected) return selected;
      }
    } else {
      const selected = privateNotesData.find((note) => note.id === noteId);
      if (selected !== undefined) {
        setSelectedNote(selected);
        if (selected) return selected;
      }
    }
    return false;
  };

  return (
    <div className="flex">
      <NoteViewer
        note={selectedNote}
        campaignData={campaignData}
        privateNotes={privateNotes}
        userId={userId}
      />
      <NoteList
        notes={campaignNotes}
        onNoteClick={handleNoteClick}
        campaignData={campaignData}
        note={selectedNote}
        privateNotes={privateNotes}
        privateNotesData={privateNotesData}
        userId={userId}
      />
    </div>
  );
};

export default NotesPage;

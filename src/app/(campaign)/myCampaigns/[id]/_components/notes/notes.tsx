"use client";
import { useState } from "react";
import NoteList from "./note-list";
import NoteViewer from "./note-viewer";
import type { Campaign } from "../types";
import type { CampaignNote } from "./types";

const NotesPage = (props: {
  campaignData: Campaign;
  campaignNotes: CampaignNote[];
  isPrivateNotes: boolean;
  myNotes: CampaignNote[];
  userId: string;
}) => {
  const { campaignData, campaignNotes, isPrivateNotes, userId, myNotes } = props;
  const [selectedNote, setSelectedNote] = useState(campaignNotes[0]);
  if (campaignNotes === undefined || myNotes === undefined)
    return <div>failed to load campaign notes</div>;

  const handleNoteClick = (noteId: string): CampaignNote | boolean => {
    if (isPrivateNotes === false) {
      const selected = campaignNotes.find((note) => note.id === noteId);
      if (selected !== undefined) {
        setSelectedNote(selected);
        if (selected) return selected;
      }
    } else {
      const selected = myNotes.find((note) => note.id === noteId);
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
        privateNotes={isPrivateNotes}
        userId={userId}
      />
      <NoteList
        notes={campaignNotes}
        onNoteClick={handleNoteClick}
        campaignData={campaignData}
        note={selectedNote}
        privateNotes={isPrivateNotes}
        myNotes={myNotes}
        userId={userId}
      />
    </div>
  );
};

export default NotesPage;

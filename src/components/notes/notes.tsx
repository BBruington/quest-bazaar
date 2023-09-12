"use client"
import { useState } from 'react';
import NoteList from './noteList';
import NoteViewer from './noteViewer';
import type { CampaignNote } from "@prisma/client";

const NotesPage = (props: {campaignNotes: CampaignNote[]}) => {
  const {campaignNotes} = props
  const [selectedNote, setSelectedNote] = useState(campaignNotes[0]);

  const handleNoteClick = (noteId: string): CampaignNote | boolean=> {
    const selected = campaignNotes.find((note) => note.id === noteId);
    setSelectedNote(selected);
    if(selected) return selected;
    return false;
  };

  return (
    <div>
      <NoteList notes={campaignNotes} onNoteClick={handleNoteClick} />
      <NoteViewer note={selectedNote} />
    </div>
  );
};

export default NotesPage;
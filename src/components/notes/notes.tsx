"use client"
import { useState } from 'react';
import NoteList from './noteList';
import NoteViewer from './noteViewer';
import type { CampaignNote, Campaign } from "@prisma/client";

const NotesPage = (props: {campaignData: Campaign, campaignNotes: CampaignNote[]}) => {
  const {campaignNotes, campaignData} = props
  const [selectedNote, setSelectedNote] = useState(campaignNotes[0]);

  const handleNoteClick = (noteId: string): CampaignNote | boolean=> {
    const selected = campaignNotes.find((note) => note.id === noteId);
    setSelectedNote(selected);
    if(selected) return selected;
    return false;
  };

  return (
    <div className='flex'>
      <NoteViewer note={selectedNote} />
      <NoteList notes={campaignNotes} onNoteClick={handleNoteClick} campaignData={campaignData} />
    </div>
  );
};

export default NotesPage;
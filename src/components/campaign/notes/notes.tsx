"use client"
import { useState } from 'react';
import NoteList from './noteList';
import NoteViewer from './noteViewer';
import type { Campaign} from '../types'
import type { CampaignNote } from "./types";

const NotesPage = (props: {campaignData: Campaign, campaignNotes: CampaignNote[], showPublicNotes: boolean}) => {
  const {campaignData, campaignNotes, showPublicNotes} = props
  const [selectedNote, setSelectedNote] = useState(campaignNotes[0]);
  if(campaignNotes === undefined) return <div>failed to load campaign notes</div>

  const handleNoteClick = (noteId: string): CampaignNote | boolean=> {
    const selected = campaignNotes.find((note) => note.id === noteId);
    setSelectedNote(selected);
    if(selected) return selected;
    return false;
  };

  return (
    <div className='flex'>
      <NoteViewer note={selectedNote} campaignData={campaignData} showPublicNotes={showPublicNotes} />
      <NoteList notes={campaignNotes} onNoteClick={handleNoteClick} campaignData={campaignData} note={selectedNote} showPublicNotes={showPublicNotes}/>
    </div>
  );
};

export default NotesPage;
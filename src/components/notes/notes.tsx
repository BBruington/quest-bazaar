import { useState } from 'react';
import NoteList from './noteList';
import NoteViewer from './noteViewer';
import type { CampaignNote } from "@prisma/client";

const notesData = [
  {
    id: "1",
    campaignId: "2",
    title: 'Note 1',
    content: 'This is the content of Note 1.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    campaignId: "3",
    title: 'Note 2',
    content: 'This is the content of Note 2.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const NotesPage = () => {
  const [selectedNote, setSelectedNote] = useState(notesData[0]);

  const handleNoteClick = (noteId: string): CampaignNote | boolean=> {
    const selected = notesData.find((note) => note.id === noteId);
    setSelectedNote(selected);
    if(selected) return selected;
    return false;
  };

  return (
    <div>
      <NoteList notes={notesData} onNoteClick={handleNoteClick} />
      <NoteViewer note={selectedNote} />
    </div>
  );
};

export default NotesPage;
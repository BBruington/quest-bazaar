import CampaignNotesMain from './campaignNotesMain';
import CampaignNotesSideBar from './campaignNotesSideBar';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function Notes() {
  const [emailNotes, setEmailNotes] = useState(['']);
  const [activeNote, setActiveNote] = useState(false);
  const [addNoteToggle, setAddNoteToggle] = useState(false);
  const [editMode,setEditMode] = useState(false);

  const defaultEmailNotes = [{
    email:'',
    id:uuid(),
    notes:[{
      title:'Remember to sign in to save your notes',
      body:'',
      id:uuid(),
      lastModified:{
        seconds: Date.now()/1000,
        milliseconds: Date.now()
      }
    }]
  }]

  const deleteNote = () => {

    return
  }

  const addNote = () => {

    return
   }

  const updateNote = () => {

    return
  }

  const getActiveNote = () => {

    return false
  }
  return (
    <>
    
      <div className="flex justify-start">
          <CampaignNotesSideBar 
          emailNotes={emailNotes} 
          addNote={addNote} 
          deleteNote={deleteNote} 
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          editMode={editMode}
          setEditMode={setEditMode}
          />
          <CampaignNotesMain 
          activeNote={activeNote}
          updateNote={updateNote}
          editMode={editMode}          
          />
      </div>
    </>
  )
}


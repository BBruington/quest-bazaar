import CampaignNotesMain from './campaignNotesMain';
import CampaignNotesSideBar from './campaignNotesSideBar';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())
export default function Notes() {
  const [emailNotes, setEmailNotes] = useState([]);
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

  // const deleteNote = async (idToDelete) => {
  //   if(emailNotes[0]) {
  //     const updatedNotesArray = [{
  //       email: emailNotes[0].email,
  //       id: emailNotes[0].id,
  //       notes:
  //       emailNotes[0].notes.filter((note) => {return note.id !== idToDelete})
  //     }]
  //       setEmailNotes(updatedNotesArray)
  //       const noteDoc = doc(db, "user notes", emailNotes[0].id)
  //       await updateDoc(noteDoc, updatedNotesArray[0])
  //   }
  // }

  // const addNote = async () => {

  //   const newNote = {
  //     title: "Untitled Note",
  //     body: "",
  //     id: uuid(),
  //     lastModified: {
  //       seconds: Date.now()/1000,
  //       milliseconds: Date.now()
  //     }
  //   };
  //   const addedNote = emailNotes;
  //   addedNote[0].notes.unshift(newNote)

  //   setEmailNotes(addedNote)
  //   setAddNoteToggle(!addNoteToggle)
    
  //   const noteDoc = doc(db, "user notes", emailNotes[0].id)
  //   await updateDoc(noteDoc, addedNote[0])
  //  }

  // const updateNote = async (updatedNote) => {
  //   if(emailNotes[0]) {
  //     const updatedNotesArray = [{
  //       email: emailNotes[0].email,
  //       id: emailNotes[0].id,
  //       notes:
  //       emailNotes[0].notes.map((note) => {
  //       if(note.id === activeNote) {
  //         return updatedNote;
  //       }
  //       return note;
  //     })}]
  //     setEmailNotes(updatedNotesArray)
  //     const noteDoc = doc(db, "user notes", emailNotes[0].id)
  //     await updateDoc(noteDoc, updatedNotesArray[0])
  //   }
  // }

  // const getActiveNote = () => {
  //   if(emailNotes[0]){
  //     const activeNoteListener = emailNotes[0].notes.find((note) => note.id === activeNote);
  //     return activeNoteListener
  //   }
  // }
  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>
  // return (
  //   <>
    
  //     <div className="flex justify-start">
  //         <CampaignNotesSideBar 
  //         emailNotes={emailNotes} 
  //         addNote={addNote} 
  //         deleteNote={deleteNote} 
  //         activeNote={activeNote}
  //         setActiveNote={setActiveNote}
  //         editMode={editMode}
  //         setEditMode={setEditMode}
  //         />
  //         <CampaignNotesMain 
  //         activeNote={getActiveNote()}
  //         updateNote={updateNote}
  //         editMode={editMode}          
  //         />
  //     </div>
  //   </>
  // )
}


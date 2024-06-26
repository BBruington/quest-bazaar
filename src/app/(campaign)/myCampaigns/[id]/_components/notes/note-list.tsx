"use client";

import uuid from "react-uuid";
import { useOptimistic, useState } from "react";
import { upsertCampaignNote, deleteCampaignNote } from "../../actions";
import { Button } from "~/components/ui/button";
import { useAtom } from "jotai";
import { selectedNoteAtom } from "../../jotaiAtoms";
import type { CampaignNote, Campaign } from "@prisma/client";

const NoteList = (props: {
  notes: CampaignNote[];
  campaignData: Campaign;
  isPrivateNotes: boolean;
  userId: string;
}) => {
  const { notes, campaignData, isPrivateNotes, userId } = props;

  const myNotes = notes.filter((note) => note.private === true);
  const publicNotes = notes.filter((note) => note.private === false);

  const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);

  const [optimisticMyNotes, setOptimisticMyNotes] = useOptimistic(
    myNotes,
    (myNotes, newNote: CampaignNote) => [...myNotes, newNote]
  );
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    publicNotes,
    (notes, newNote: CampaignNote) => [...notes, newNote]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleNoteClick = (noteId: string): CampaignNote | boolean => {
    const selected = notes.find((note) => note.id === noteId);
    if (selected !== undefined) {
      setSelectedNote(selected);
      return selected;
}
    return false;
  };

  const handleCreateNewCampaignNote = async () => {
    setIsLoading(true);
    if (isPrivateNotes === true) {
      setOptimisticMyNotes({
        id: uuid(),
        userId,
        campaignId: campaignData.id,
        title: "New Note",
        content: "",
        private: true,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    if (isPrivateNotes === false) {
      setOptimisticNotes({
        id: uuid(),
        userId,
        campaignId: campaignData.id,
        title: "New Note",
        content: "",
        private: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await upsertCampaignNote({
      noteId: uuid(),
      campaignId: campaignData.id,
      userId: userId,
      privateNote: isPrivateNotes ? true : false,
      title: "New Note",
      content: "",
    });
    setIsLoading(false);
  };

  const handleDeleteCampaignNote = async () => {
    if (selectedNote?.id !== undefined) {
      setSelectedNote(undefined);
      await deleteCampaignNote({
        noteId: selectedNote?.id,
        campaignId: campaignData.id,
      });
    }
  };
  return (
    <div className="flex h-screen w-1/6  flex-col items-center border-l-2 border-slate-600 bg-accent-foreground">
      <div className="flex w-full flex-col">
        <h2 className="mt-5 w-full border-b-2 border-slate-600 pb-3 text-center text-xl text-white">
          {isPrivateNotes === true ? "My Notes" : "Notes"}
        </h2>
        <div className="my-2 flex flex-col items-center justify-center gap-5 xl:flex-row">
          <Button
            disabled={isLoading}
            className="w-20"
            onClick={handleCreateNewCampaignNote}
          >
            Add
          </Button>
          <Button className="w-20" onClick={handleDeleteCampaignNote}>
            Delete
          </Button>
        </div>
      </div>
      <ul className="mt-1 w-full space-y-3 text-center">
        {isPrivateNotes
          ? optimisticMyNotes.map((note) => (
              <div
                key={note.id}
                className="hover:cursor-pointer hover:bg-slate-800"
                onClick={() => handleNoteClick(note.id)}
              >
                <li key={note.id} className="text-lg text-white">
                  {note.title}
                </li>
                <li className="text-xs text-white">
                  Last Modified:{" "}
                  {note.updatedAt.toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              </div>
            ))
          : optimisticNotes.map((note) => (
              <div
                key={note.id}
                className="hover:cursor-pointer hover:bg-slate-800"
                onClick={() => handleNoteClick(note.id)}
              >
                <li key={note.id} className="text-lg text-white">
                  {note.title}
                </li>
                <li className="text-xs text-white">
                  Last Modified:{" "}
                  {note.updatedAt.toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              </div>
            ))}
      </ul>
    </div>
  );
};

export default NoteList;

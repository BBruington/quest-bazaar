import type { Campaign } from "../types";
import uuid from "react-uuid";
import React from "react";
import { upsertCampaignNote, deleteCampaignNote } from "../../actions";
import { Button } from "~/components/ui/button";
import type { CampaignNote } from "./types";
const NoteList = (props: {
  notes: CampaignNote[];
  onNoteClick: (noteId: string) => CampaignNote | boolean;
  campaignData: Campaign;
  note: CampaignNote | undefined;
  privateNotes: boolean;
  myNotes: CampaignNote[];
  userId: string;
}) => {
  const {
    notes,
    onNoteClick,
    campaignData,
    note,
    privateNotes,
    myNotes,
    userId,
  } = props;

  const handleCreateNewCampaignNote = async () => {
    await upsertCampaignNote({
      noteId: uuid(),
      campaignId: campaignData.id,
      userId: userId,
      privateNote: privateNotes ? true : false,
      title: "New Note",
      content: "",
    });
  };

  const handleDeleteCampaignNote = async () => {
    if (note?.id !== undefined) {
      await deleteCampaignNote({
        noteId: note?.id,
        campaignId: campaignData.id,
      });
    }
  };
  return (
    <div className="flex h-screen w-1/6  flex-col items-center border-l-2 border-slate-600 bg-accent-foreground">
      <div className="flex w-full flex-col">
        <h2 className="mt-5 w-full border-b-2 border-slate-600 pb-3 text-center text-xl text-white">
          Notes
        </h2>
        <div className="my-2 flex flex-col items-center justify-center gap-5 xl:flex-row">
          <Button className="w-20" onClick={handleCreateNewCampaignNote}>
            Add
          </Button>
          <Button className="w-20" onClick={handleDeleteCampaignNote}>
            Delete
          </Button>
        </div>
      </div>
      <ul className="mt-1 w-full space-y-3 text-center">
        {privateNotes
          ? myNotes.map((note) => (
              <div
                key={note.id}
                className="hover:cursor-pointer hover:bg-slate-800"
                onClick={() => onNoteClick(note.id)}
              >
                <li key={note.id} className="text-lg text-white">
                  {note.title}
                </li>
                <li className="text-xs text-white">
                  Last Modified:{" "}
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              </div>
            ))
          : notes.map((note) => (
              <div
                key={note.id}
                className="hover:cursor-pointer hover:bg-slate-800"
                onClick={() => onNoteClick(note.id)}
              >
                <li key={note.id} className="text-lg text-white">
                  {note.title}
                </li>
                <li className="text-xs text-white">
                  Last Modified:{" "}
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
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

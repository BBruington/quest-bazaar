import type { Campaign} from '../types'
import uuid from "react-uuid";
import React from "react";
import { api } from "~/utils/trpc";
import { Button } from "~/components/ui/button";
import type { CampaignNote } from "./types";
const NoteList = (props: {
  notes: CampaignNote[];
  onNoteClick: (noteId: string) => CampaignNote | boolean;
  campaignData: Campaign;
  note: CampaignNote | undefined;
  privateNotes: boolean;
  privateNotesData: CampaignNote[];
  userId: string
}) => {
  const { notes, onNoteClick, campaignData, note, privateNotes, privateNotesData, userId } = props;
  const utils = api.useContext();
  const upsertNote = api.upsertCampaignNote.useMutation({
    onSuccess: async () => {
      if(privateNotes === false) {
        await utils.queryCampaignNotes.invalidate();
      } else {
        await utils.queryCampaignPrivateNotes.invalidate();
      }
    },
  });
  const deleteNote = api.deleteCampaignNote.useMutation({
    onSuccess: async () => {
      if(privateNotes === false) {
        await utils.queryCampaignNotes.invalidate();
      } else {
        await utils.queryCampaignPrivateNotes.invalidate();
      }
    },
  });
  return (
    <div className="flex h-screen w-1/6  flex-col items-center border-l-2 border-slate-600 bg-accent-foreground">
      <div className="flex w-full flex-col">
        <h2 className="mt-5 w-full border-b-2 border-slate-600 pb-3 text-center text-xl text-white">
          Notes
        </h2>
        <div className="my-2 flex flex-col xl:flex-row items-center justify-center gap-5">
          <Button
            className="w-20"
            onClick={() =>
              upsertNote.mutate({
                id: uuid(),
                campaignId: campaignData.id,
                userId: userId,
                private: privateNotes ? true : false,
                title: "New Note",
                content: "",
              })
            }
          >
            Add
          </Button>
          <Button
            className="w-20"
            onClick={() =>
              deleteNote.mutate({
                id: note?.id,
              })
            }
          >
            Delete
          </Button>
        </div>
      </div>
      <ul className="mt-1 w-full space-y-3 text-center">
        {privateNotes ? privateNotesData.map((note) => (
            <React.Fragment key={note.id}>
              <div
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
            </React.Fragment>
          )) :
          notes.map((note) => (
            <React.Fragment key={note.id}>
              <div
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
            </React.Fragment>
          ))
        }
      </ul>
    </div>
  );
};

export default NoteList;

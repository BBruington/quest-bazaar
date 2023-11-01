import type { CampaignNote, Campaign } from "@prisma/client";
import uuid from "react-uuid";
import { api } from "~/utils/trpc";
import { Button } from "../ui/button";
const NoteList = (props: {
  notes: CampaignNote[];
  onNoteClick: (noteId: string) => CampaignNote | boolean;
  campaignData: Campaign
}) => {
  const { notes, onNoteClick, campaignData } = props;
  const upsertNote = api.upsertCampaignNote.useMutation();
  return (
    <div className="flex h-screen w-1/6  flex-col items-center border-l-2 border-slate-600 bg-accent-foreground">
      <div className="flex flex-col">
        <h2 className="mt-5 w-full border-b-2 border-slate-600 pb-3 text-center text-xl text-white">
          Notes
        </h2>
        <div className="flex">
          <Button onClick={() => upsertNote.mutate({
            id: uuid(),
            campaignId: campaignData.id,
            title: 'New Note',
            content: '',
          })}>Add</Button>
          <Button>Delete</Button>
        </div>
      </div>
      <ul className="mt-1 w-full space-y-3 text-center">
        {notes.map((note) => (
          <>
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
          </>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

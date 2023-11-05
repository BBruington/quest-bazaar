"use-client";
import type { CampaignNote } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";

const NoteViewer = (props: { note: CampaignNote | undefined }) => {
  const { note } = props;
  const [campaignNote, setCampaigNote] = useState(note);
  useEffect(() => {
   setCampaigNote(note)
  }, [note]);
  return (
    <div className="flex w-5/6 flex-col items-center text-white">
      {campaignNote && (
        <>
          <div className="flex h-full w-5/6 flex-col">
            <h2 className="flex h-1/6 w-full items-center justify-center bg-accent-foreground text-5xl">
              {campaignNote.title}
            </h2>
            <p className="mt-5 flex h-5/6 w-full bg-accent-foreground p-5">
              {campaignNote.content}
            </p>
          </div>
          <div className="flex h-full w-5/6 flex-col">
            <Textarea
              placeholder="Title"
              className="flex h-1/6 w-full items-center justify-center bg-accent-foreground text-5xl"
            >
              {campaignNote.title}
            </Textarea>
            <Textarea className="mt-5 flex h-5/6 w-full bg-accent-foreground p-5">
              {campaignNote.content}
            </Textarea>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteViewer;

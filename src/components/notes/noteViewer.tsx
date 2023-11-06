"use-client";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import type { CampaignNote } from "./types";

const NoteViewer = (props: { note: CampaignNote | undefined }) => {
  const { note } = props;
  const [campaignNote, setCampaigNote] = useState(note);
  const editField = (key: string, value: string) => {
    if (campaignNote !== undefined) {
      setCampaigNote({
        ...campaignNote,
        [key]: value,
      });
    }
  };
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
              id="title"
              value={campaignNote.title}
              onChange={(e) => editField("title", e.target.value)}
              autoFocus
              className="flex h-1/6 w-full items-center justify-center bg-accent-foreground text-5xl"
            ></Textarea>
            <Textarea
              className="mt-5 flex h-5/6 w-full bg-accent-foreground p-5"
              id="content"
              value={campaignNote.content}
              onChange={(e) => editField("content", e.target.value)}
              placeholder="Write your note here"
            ></Textarea>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteViewer;

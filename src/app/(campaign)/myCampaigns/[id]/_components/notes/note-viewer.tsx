"use-client";
import type { Campaign } from "../types";
import { Textarea } from "~/components/ui/textarea";
import { useEffect, useState } from "react";
import type { CampaignNote } from "./types";
import { upsertCampaignNote } from "../../actions";

const NoteViewer = (props: {
  note: CampaignNote | undefined;
  campaignData: Campaign;
  privateNotes: boolean;
  userId: string;
}) => {
  const { note, campaignData, privateNotes, userId } = props;
  
  const [campaignNote, setCampaigNote] = useState(note);
  useEffect(() => {
    setCampaigNote(note);
  }, [note]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSaveNote()
    }, 1000); 
    return () => clearTimeout(timeoutId);
  }, [campaignNote]);

  const handleSaveNote = async () => {
    if (
      campaignNote?.title !== undefined &&
      campaignNote?.content !== undefined
    ) {
      await upsertCampaignNote({
        noteId: campaignNote.id,
        userId: userId,
        privateNote: privateNotes ? true : false,
        campaignId: campaignData.id,
        title: campaignNote.title,
        content: campaignNote.content,
      });
    }
  };

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
        <div className="flex h-full w-5/6 flex-col">
          <Textarea
            className="flex h-1/6 w-full items-center justify-center bg-accent-foreground text-5xl"
            id="title"
            value={campaignNote.title}
            onChange={(e) => editField("title", e.target.value)}
            placeholder="Title"
            onBlur={() => handleSaveNote()}
          ></Textarea>
          <Textarea
            className="mt-5 flex h-5/6 w-full bg-accent-foreground p-5"
            id="content"
            value={campaignNote.content}
            onChange={(e) => editField("content", e.target.value)}
            placeholder="Write your note here"
            onBlur={() => handleSaveNote()}
          ></Textarea>
        </div>
      )}
    </div>
  );
};

export default NoteViewer;

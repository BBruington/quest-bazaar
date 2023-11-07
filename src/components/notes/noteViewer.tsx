"use-client";
import type { Campaign } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { api } from "~/utils/trpc";
import type { CampaignNote } from "./types";
import { Button } from "../ui/button";

const NoteViewer = (props: {
  note: CampaignNote | undefined;
  campaignData: Campaign;
}) => {
  const { note, campaignData } = props;
  const utils = api.useContext();
  const [campaignNote, setCampaigNote] = useState(note);
  const [editMode, setEditmode] = useState(false);
  const upsertNote = api.upsertCampaignNote.useMutation({
    onSuccess: async () => {
      await utils.queryCampaignNotes.invalidate();
      setCampaigNote(note);
    },
  });
  const handleSaveNote = () => {
    if (
      campaignNote?.title !== undefined &&
      campaignNote?.content !== undefined
    ) {
      upsertNote.mutate({
        id: campaignNote.id,
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
      <Button onClick={() => setEditmode(!editMode)}>Edit</Button>
      <Button onClick={() => handleSaveNote}>Save</Button>
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
          {editMode ? (
            <div className="flex h-full w-5/6 flex-col">
              <Textarea
                className="flex h-1/6 w-full items-center justify-center bg-accent-foreground text-5xl"
                id="title"
                value={campaignNote.title}
                onChange={(e) => editField("title", e.target.value)}
                placeholder="Title"
              ></Textarea>
              <Textarea
                className="mt-5 flex h-5/6 w-full bg-accent-foreground p-5"
                id="content"
                value={campaignNote.content}
                onChange={(e) => editField("content", e.target.value)}
                placeholder="Write your note here"
              ></Textarea>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default NoteViewer;

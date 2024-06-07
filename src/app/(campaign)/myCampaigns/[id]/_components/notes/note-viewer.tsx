"use-client";
import type { Campaign } from "@prisma/client";
import { Textarea } from "~/components/ui/textarea";
import { useEffect } from "react";
import { upsertCampaignNote } from "../../actions";
import { useAtom } from "jotai";
import { selectedNoteAtom } from "../../jotaiAtoms";

const NoteViewer = (props: {
  campaignData: Campaign;
  isPrivateNotes: boolean;
  userId: string;
}) => {
  const { campaignData, isPrivateNotes, userId } = props;
  const [campaignNote, setCampaigNote] = useAtom(selectedNoteAtom)

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
        privateNote: isPrivateNotes ? true : false,
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

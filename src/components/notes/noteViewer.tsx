import type { CampaignNote } from "@prisma/client";

const NoteViewer = (props: { note: CampaignNote | undefined}) => {

  const { note } = props;
  return (
    <div className="flex flex-col w-5/6 text-white items-center">
      {note && (
        <>
        <div className="flex flex-col h-full w-5/6">
          <h2 className="flex h-1/6 justify-center items-center text-5xl bg-accent-foreground w-full">{note.title}</h2>
          <p className="flex p-5 mt-5 bg-accent-foreground w-full h-5/6">{note.content}</p>

        </div>
        </>
      )}
    </div>
  );
};

export default NoteViewer;
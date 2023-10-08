import type { CampaignNote } from "@prisma/client";

const NoteViewer = (props: { note: CampaignNote | undefined}) => {

  const { note } = props;
  return (
    <div className="flex w-5/6 text-white justify-center items-center">
      {note && (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </>
      )}
    </div>
  );
};

export default NoteViewer;
import type { CampaignNote } from "@prisma/client";

const NoteViewer = (props: { note: CampaignNote | undefined}) => {

  const { note } = props;
  return (
    <div>
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
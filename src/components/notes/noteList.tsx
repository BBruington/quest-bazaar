import type { CampaignNote } from "@prisma/client";
const NoteList = (props: { notes: CampaignNote[], onNoteClick: (noteId: string) => CampaignNote | boolean}) => {
  const { notes, onNoteClick } = props;

  console.log(notes)
  return (
    <div className="flex flex-col w-1/6 justify-center items-center">
      <h2 className="text-white text-xl my-5">Notes</h2>
      <ul className="space-y-5">
        {notes.map((note) => (
          <li key={note.id} className="text-white" onClick={() => onNoteClick(note.id)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
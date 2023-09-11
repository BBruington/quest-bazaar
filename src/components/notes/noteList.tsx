import type { CampaignNote } from "@prisma/client";
const NoteList = (props: { notes: CampaignNote[], onNoteClick: (noteId: string) => CampaignNote | boolean}) => {
  const { notes, onNoteClick } = props
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => onNoteClick(note.id)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
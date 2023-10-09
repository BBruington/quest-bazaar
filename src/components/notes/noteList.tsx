import type { CampaignNote } from "@prisma/client";
const NoteList = (props: { notes: CampaignNote[], onNoteClick: (noteId: string) => CampaignNote | boolean}) => {
  const { notes, onNoteClick } = props;

  return (
    <div className="flex flex-col w-1/6  items-center border-l-2 border-slate-600 h-screen bg-accent-foreground">
      <h2 className="text-white text-xl text-center mt-5 border-b-2 border-slate-600 w-full pb-3">Notes</h2>
      <ul className="w-full text-center space-y-3 mt-1">
        {notes.map((note) => (
          <>
          <div className="hover:cursor-pointer hover:bg-slate-800 ">
              <li key={note.id} className="text-white text-lg" onClick={() => onNoteClick(note.id)}>
                {note.title}
              </li>
              <li className="text-white text-xs">
                Last Modified: {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </li>
          </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
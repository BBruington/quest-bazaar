import { atom } from "jotai";
import { CampaignNote } from "./_components/notes/types";
const selectedNoteAtom = atom<CampaignNote | undefined>(undefined);

export { selectedNoteAtom };
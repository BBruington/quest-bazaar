import { atom } from "jotai";
import { CampaignNote } from "@prisma/client";
const selectedNoteAtom = atom<CampaignNote | undefined>(undefined);

export { selectedNoteAtom };
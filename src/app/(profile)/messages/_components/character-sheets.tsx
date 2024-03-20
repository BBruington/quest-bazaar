"use client";

import Link from "next/link";
import { Character } from "@prisma/client";
import { createNewCharacterSheet } from "../actions";
import { useState } from "react";
import { Button } from "~/components/ui/button";
interface CharacterSheetsProps {
  charactersheets: Character[] | undefined;
  userId: string;
}

export default function CharacterSheets({
  charactersheets,
  userId,
}: CharacterSheetsProps) {
  
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewCharacter = async () => {
    setIsLoading(true);
    const newCharacter = await createNewCharacterSheet({ userId });
    setIsLoading(false);
    if (newCharacter) {
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_URL}/character/${newCharacter.id}`,
        "_blank"
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center space-x-3 py-1 hover:cursor-pointer hover:bg-slate-800">
        <Button disabled={isLoading} onClick={handleCreateNewCharacter}>
          Create New Character
        </Button>
      </div>
      {charactersheets?.map((sheet) => (
        <Link
          className="w-full py-1 hover:bg-slate-800"
          key={sheet.id}
          target="_blank"
          href={`/character/${sheet.id}`}
        >
          <div className="flex items-center justify-center space-x-3">
            <span className="">{sheet.charname}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

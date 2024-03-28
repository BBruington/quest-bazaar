import { prisma } from "~/utils/context";
import CharacterData from "~/app/(charactersheet)/character/[id]/_components/character";
import { Metadata } from "next";

export default async function CharacterSheet({
  params,
}: {
  params: { id: string };
}) {
  const character = await prisma.character.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!character) return <span>failed to load</span>;
  return (
    <>
      <CharacterData character={character} characterId={params.id} />;
    </>
  );
}

export const metadata: Metadata = {
  title: "Character Sheet",
};

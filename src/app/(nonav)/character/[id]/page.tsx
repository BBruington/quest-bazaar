import { prisma } from "~/utils/context";
import CharacterData from "~/components/characterSheet/character";

export default async function CharacterSheet({ params }: { params: { id: string } }) {
  const character = await prisma.character.findUnique({
    where: {
      id: params.id
    }
  })
  if(!character) return <span>failed to load</span>
  return (
    <CharacterData character={character} characterId={params.id} />
  )
}
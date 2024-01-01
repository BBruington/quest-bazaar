import { prisma } from "~/utils/context"

export default async function CharacterSheet({ params }: { params: { id: string } }) {
  const character = await prisma.character.findUnique({
    where: {
      id: params.id
    }
  })
  if(!character) return <span>failed to load</span>
  return (
    <div className="text-white">here is a character {character.charname}</div>
  )
}
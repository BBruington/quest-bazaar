import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

export default function CharacterTrait(props: {
  name: string;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { name, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <div className="personality flex flex-col-reverse items-center rounded-md border-2 border-black">
      <Label className="bg-slate-100 text-xs text-center rounded-sm w-full p-[2px]" htmlFor={name}>
        {name.toUpperCase()}
      </Label>
      <textarea
        {...register(name)}
        className="h-[100px] w-full px-1"
        id={name}
        name={name}
      ></textarea>
    </div>
  );
}

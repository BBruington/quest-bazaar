import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

export default function CharacterSave(props: {
  save: string;
  prof: string;
  label: string;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { save, prof, label, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <li className="flex flex-row-reverse items-center space-x-2">
      <Label className="ml-2 text-[11px] font-bold" htmlFor={save}>
        {label}
      </Label>
      <input
        type="number"
        {...register(save, {
          valueAsNumber: true,
          onBlur: handleSubmit(saveCharacter),
        })}
        className="w-8 border-b-2 border-black text-center text-sm"
        id={save}
        name={save}
        placeholder="+0"
      />
      <input
        {...register(prof)}
        id={prof}
        name={prof}
        type="checkbox"
      />
    </li>
  );
}

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
    <li className="saves-li">
      <Label className="ml-2 text-[11px] font-bold" htmlFor={save}>
        {label}
      </Label>
      <input
        type="number"
        {...register(save, {
          valueAsNumber: true,
          onBlur: handleSubmit(saveCharacter),
        })}
        className="saves-total-input"
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

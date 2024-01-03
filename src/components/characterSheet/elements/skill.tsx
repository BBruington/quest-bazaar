import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

export default function CharacterSkill(props: {
  skill: string;
  prof: string;
  expertise: string;
  label: string;
  attribute: string;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { skill, prof, expertise, label, attribute, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <li className="flex flex-row-reverse items-center justify-end space-x-1">
      <Label className="ml-1 text-[10px]" htmlFor={skill}>
        {label} <span className="skill">({attribute})</span>
      </Label>
      <input
        type="number"
        {...register(skill, {
          valueAsNumber: true,
          onBlur: handleSubmit(saveCharacter),
        })}
        className="w-5 border-b-2 border-black text-center text-xs"
        id={skill}
        name={skill}
        placeholder="+0"
      />
      <input
        {...register(expertise)}
        id={expertise}
        name={expertise}
        type="checkbox"
      />
      <input {...register(prof)} id={prof} name={prof} type="checkbox" />
    </li>
  );
}

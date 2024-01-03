import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

export default function CharacterHeader(props: {
  title: string;
  label: string;
  placeholder: string;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { title, label, placeholder, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <li className="flex w-1/3 flex-col-reverse">
      <Label className="mb-2 text-sm font-bold" htmlFor={title}>
        {label}
      </Label>
      {title === "level" ? (
        <input
          {...register(title, {
            onBlur: handleSubmit(saveCharacter),
            valueAsNumber: true,
          })}
          className="border-0 border-b-2 border-slate-300"
          id={title}
          name={title}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...register(title, {
            onBlur: handleSubmit(saveCharacter),
          })}
          className="border-0 border-b-2 border-slate-300"
          id={title}
          name={title}
          placeholder={placeholder}
        />
      )}
    </li>
  );
}

import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/app/(charactersheet)/character/characterTypes";

const CharacterAttribute = (props: {
  name: string;
  modName: string;
  label: string;
  score: number | null;
  saveCharacter: SubmitHandler<CharacterForm>;
}) => {
  const { name, modName, label, score, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <li className="flex flex-col items-center justify-center rounded-xl border-2 border-black bg-white">
      <div className="score flex flex-col">
        <Label
          className={`text-center ${
            label === "Constitution" || "Intelligence"
              ? "text-[9px]"
              : "text-xs"
          } font-bold`}
          htmlFor="strengthscore"
        >
          {label}
        </Label>
        <input
          type="number"
          {...register(name, {
            valueAsNumber: true,
            onBlur: handleSubmit(saveCharacter),
          })}
          className="h-10 w-14 text-center text-2xl"
          id={name}
          name={name}
          placeholder="10"
        />
      </div>
      <div className="modifier flex justify-center">
        <input
          value={`+${score ? Math.floor((score - 10) / 2) : 0}`}
          className="m-[-1px] w-10 rounded-xl border-2 border-black text-center"
          id={modName}
          name={modName}
          placeholder="+0"
        />
      </div>
    </li>
  );
};

export default CharacterAttribute;

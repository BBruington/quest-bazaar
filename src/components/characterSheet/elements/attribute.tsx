import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

const CharacterAttribute = (props: { name: string, modName: string, label: string, score: number | null, saveCharacter: SubmitHandler<CharacterForm> }) => {
  
  const {name, modName, label,score, saveCharacter} = props
  const { register, handleSubmit } = useFormContext(); 

  return (
    <li className="ability-li">
      <div className="score flex flex-col">
        <Label
          className={`text-center ${label === "Constitution" || "Intelligence" ? 'text-[9px]' : 'text-xs'} font-bold`}
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
          className="ability-score-input"
          id={name}
          name={name}
          placeholder="10"
        />
      </div>
      <div className="modifier flex justify-center">
        <input
          value={`+${
            score
              ? Math.floor((score - 10) / 2)
              : 0
          }`}
          className="ability-modifier-input"
          id={modName}
          name={modName}
          placeholder="+0"
        />
      </div>
    </li>
  );
};

export default CharacterAttribute;

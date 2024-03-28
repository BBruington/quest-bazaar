import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { CharacterForm } from "~/app/(charactersheet)/character/characterTypes";

export default function CharacterSave(props: {
  save: string;
  prof: string;
  label: string;
  character: CharacterForm;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { save, prof, label, character, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();
  const [toggle, setToggle] = useState(false);
  const [saveProf, setSaveProf] = useState(false);
  const setprof = () => {
    switch (label) {
      case "Strength":
        setSaveProf(
          character.strengthsaveprof ? character.strengthsaveprof : false
        );
        break;
      case "Dexterity":
        setSaveProf(
          character.dexteritysaveprof ? character.dexteritysaveprof : false
        );
        break;
      case "Constitution":
        setSaveProf(
          character.constitutionsaveprof
            ? character.constitutionsaveprof
            : false
        );
        break;
      case "Wisdom":
        setSaveProf(
          character.wisdomsaveprof ? character.wisdomsaveprof : false
        );
        break;
      case "Intelligence":
        setSaveProf(
          character.intelligencesaveprof
            ? character.intelligencesaveprof
            : false
        );
        break;
      case "Charisma":
        setSaveProf(
          character.charismasaveprof ? character.charismasaveprof : false
        );
        break;
    }
  };
  if (toggle === false) {
    setprof();
    setToggle(true);
  }

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
        checked={saveProf}
        {...register(prof)}
        id={prof}
        name={prof}
        type="checkbox"
        onClick={() => {
          setSaveProf(!saveProf);
          character.inspiration = !character.inspiration;
          setTimeout(handleSubmit(saveCharacter), 100);
        }}
      />
    </li>
  );
}

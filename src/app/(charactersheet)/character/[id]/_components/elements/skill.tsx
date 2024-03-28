import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/app/(charactersheet)/character/characterTypes";
export default function CharacterSkill(props: {
  skill: string;
  prof: string;
  expertise: string;
  label: string;
  attribute: string;
  character: CharacterForm;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { skill, prof, expertise, label, attribute, character, saveCharacter } =
    props;
  const { register, handleSubmit } = useFormContext();

  const [toggle, setToggle] = useState(false);
  const [skillprof, setSkillProf] = useState({
    prof: false,
    expertise: false,
  });
  const setProf = () => {
    switch (label) {
      case "Acrobatics":
        setSkillProf({
          prof: character.acrobaticsprof ? character.acrobaticsprof : false,
          expertise: character.acrobaticsexpertise
            ? character.acrobaticsexpertise
            : false,
        });
        break;
      case "Animal Handling":
        setSkillProf({
          prof: character.animalhandlingprof
            ? character.animalhandlingprof
            : false,
          expertise: character.animalhandlingexpertise
            ? character.animalhandlingexpertise
            : false,
        });
        break;
      case "Arcana":
        setSkillProf({
          prof: character.arcanaprof ? character.arcanaprof : false,
          expertise: character.arcanaexpertise
            ? character.arcanaexpertise
            : false,
        });
        break;
      case "Athletics":
        setSkillProf({
          prof: character.athleticsprof ? character.athleticsprof : false,
          expertise: character.athleticsexpertise
            ? character.athleticsexpertise
            : false,
        });
        break;
      case "Deception":
        setSkillProf({
          prof: character.deceptionprof ? character.deceptionprof : false,
          expertise: character.deceptionexpertise
            ? character.deceptionexpertise
            : false,
        });
        break;
      case "History":
        setSkillProf({
          prof: character.historyprof ? character.historyprof : false,
          expertise: character.historyexpertise
            ? character.historyexpertise
            : false,
        });
        break;
      case "Insight":
        setSkillProf({
          prof: character.insightprof ? character.insightprof : false,
          expertise: character.insightexpertise
            ? character.insightexpertise
            : false,
        });
        break;
      case "Intimidation":
        setSkillProf({
          prof: character.intimidationprof ? character.intimidationprof : false,
          expertise: character.intimidationexpertise
            ? character.intimidationexpertise
            : false,
        });
        break;
      case "Investigation":
        setSkillProf({
          prof: character.investigationprof
            ? character.investigationprof
            : false,
          expertise: character.investigationexpertise
            ? character.investigationexpertise
            : false,
        });
        break;
      case "Perception":
        setSkillProf({
          prof: character.perceptionprof ? character.perceptionprof : false,
          expertise: character.perceptionexpertise
            ? character.perceptionexpertise
            : false,
        });
        break;
      case "Performance":
        setSkillProf({
          prof: character.performanceprof ? character.performanceprof : false,
          expertise: character.performanceexpertise
            ? character.performanceexpertise
            : false,
        });
        break;
      case "Persuasion":
        setSkillProf({
          prof: character.persuasionprof ? character.persuasionprof : false,
          expertise: character.persuasionexpertise
            ? character.persuasionexpertise
            : false,
        });
        break;
      case "Religion":
        setSkillProf({
          prof: character.religionprof ? character.religionprof : false,
          expertise: character.religionexpertise
            ? character.religionexpertise
            : false,
        });
        break;
      case "Sleight of Hand":
        setSkillProf({
          prof: character.sleightofhandprof
            ? character.sleightofhandprof
            : false,
          expertise: character.sleightofhandexpertise
            ? character.sleightofhandexpertise
            : false,
        });
        break;
      case "Stealth":
        setSkillProf({
          prof: character.stealthprof ? character.stealthprof : false,
          expertise: character.stealthexpertise
            ? character.stealthexpertise
            : false,
        });
        break;
      case "Survival":
        setSkillProf({
          prof: character.survivalprof ? character.survivalprof : false,
          expertise: character.survivalexpertise
            ? character.survivalexpertise
            : false,
        });
        break;
    }
  };

  if (toggle === false) {
    setProf();
    setToggle(true);
  }

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
        checked={skillprof.expertise}
        {...register(expertise)}
        id={expertise}
        name={expertise}
        type="checkbox"
        onClick={() => {
          setSkillProf({
            prof: skillprof.prof,
            expertise: !skillprof.expertise,
          });
          character.inspiration = !character.inspiration;
          setTimeout(handleSubmit(saveCharacter), 100);
        }}
      />
      <input
        checked={skillprof.prof}
        {...register(prof)}
        id={prof}
        name={prof}
        type="checkbox"
        onClick={() => {
          setSkillProf({
            prof: !skillprof.prof,
            expertise: skillprof.expertise,
          });
          character.inspiration = !character.inspiration;
          setTimeout(handleSubmit(saveCharacter), 100);
        }}
      />
    </li>
  );
}

"use client";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/trpc";

export default function Test() {
  const {mutate: createCharacter} = api.createCharacterSheet.useMutation()
  const saveCharacterSheet: SubmitHandler<CharacterForm> = (data) => {
    
    createCharacter({userId: "someIdA", charName: data.charName, className: data.className, background: data.background})
    console.log(data);
  };

  const { register, handleSubmit } = useForm<CharacterForm>();

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(saveCharacterSheet)}
        className="charsheet flex w-[1000px] flex-col bg-white align-middle"
      >
        <input type="submit"></input>
        {/* header with char name, basic class info */}
        <header className="flex">
          <section className="charName m-auto ml-1 flex w-1/3 flex-col-reverse rounded-md border-2 border-r-0 border-black bg-slate-400 p-2">
            <Label htmlFor="charName">Character Name</Label>
            <input
              {...register("charName")}
              className="px-1"
              id="charName"
              name="charName"
            />
          </section>
          <section className="misc m-1 ml-0 w-2/3 rounded-md border-2 border-black px-1">
            <ul className="flex flex-wrap py-3">
              <li className="header-li">
                <Label className="mb-2" htmlFor="className">
                  Class
                </Label>
                <input
                  {...register("className")}
                  className="header-input"
                  id="className"
                  name="className"
                  placeholder="Paladin"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="background">
                  Background
                </Label>
                <input
                  {...register("background")}
                  className="header-input"
                  name="background"
                  id="background"
                  placeholder="Acolyte"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="playername">
                  Player Name
                </Label>
                <input
                  className="header-input"
                  id="playername"
                  name="playername"
                  placeholder="Player McPlayerface"
                ></input>
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="race">
                  Race
                </Label>
                <input
                  className="header-input"
                  id="race"
                  name="race"
                  placeholder="Half-elf"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="alignment">
                  Alignment
                </Label>
                <input
                  className="header-input"
                  id="alignment"
                  name="alignment"
                  placeholder="Lawful Good"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="Level">
                  Level
                </Label>
                <input
                  className="header-input"
                  id="Level"
                  name="Level"
                  placeholder="1-20"
                />
              </li>
            </ul>
          </section>
        </header>

        <main className="flex justify-between">
          {/* stats, saves, skills, and proficiencies */}
          <section className="ml-1 flex w-1/3 flex-col items-start">
            {/* stats, saves, and skills */}
            <section className="attributes flex">
              {/* Base Stats */}
              <div className="scores flex w-[100px] flex-col rounded-md bg-slate-400 pb-2">
                <ul className="m-3 flex h-[612px] flex-col justify-between space-y-1 rounded-xl bg-slate-400">
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-xs font-bold"
                        htmlFor="Strengthscore"
                      >
                        Strength
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Strengthscore"
                        name="Strengthscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Strengthmod"
                        name="Strengthmod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-xs font-bold"
                        htmlFor="Dexterityscore"
                      >
                        Dexterity
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Dexterityscore"
                        name="Dexterityscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Dexteritymod"
                        name="Dexteritymod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-[9px] font-bold"
                        htmlFor="Constitutionscore"
                      >
                        Constitution
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Constitutionscore"
                        name="Constitutionscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Constitutionmod"
                        name="Constitutionmod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-xs font-bold"
                        htmlFor="Wisdomscore"
                      >
                        Wisdom
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Wisdomscore"
                        name="Wisdomscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Wisdommod"
                        name="Wisdommod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-[9px] font-bold"
                        htmlFor="Intelligencescore"
                      >
                        Intelligence
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Intelligencescore"
                        name="Intelligencescore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Intelligencemod"
                        name="Intelligencemod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-xs font-bold"
                        htmlFor="Charismascore"
                      >
                        Charisma
                      </Label>
                      <input
                        className="ability-score-input"
                        id="Charismascore"
                        name="Charismascore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        className="ability-modifier-input"
                        id="Charismamod"
                        name="Charismamod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                </ul>
              </div>

              {/* inspiration, prof bonus, saves, and skills */}
              <div className="attr-applications m-1 flex w-[150px] flex-col">
                <div className="inspiration box flex flex-row-reverse">
                  <div className="Label-container">
                    <Label className="text-[12px]" htmlFor="inspiration">
                      Inspiration
                    </Label>
                  </div>
                  <input
                    className="mr-3"
                    id="inspiration"
                    name="inspiration"
                    type="checkbox"
                  />
                </div>
                <div className="proficiencybonus box flex flex-row-reverse">
                  <div className="Label-container">
                    <Label className="text-[12px]" htmlFor="proficiencybonus">
                      Proficiency Bonus
                    </Label>
                  </div>
                  <input
                    className="w-8"
                    id="proficiencybonus"
                    name="proficiencybonus"
                    placeholder="+2"
                  />
                </div>

                {/* saves */}
                <div className="saves list-section box my-2 flex flex-col-reverse rounded-xl border-2 border-black p-1">
                  <ul className="flex flex-col items-baseline justify-between ">
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Strength-save"
                      >
                        Strength
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Strength-save"
                        name="Strength-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Strength-save-prof"
                        name="Strength-save-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Dexterity-save"
                      >
                        Dexterity
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Dexterity-save"
                        name="Dexterity-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Dexterity-save-prof"
                        name="Dexterity-save-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Constitution-save"
                      >
                        Constitution
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Constitution-save"
                        name="Constitution-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Constitution-save-prof"
                        name="Constitution-save-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Wisdom-save"
                      >
                        Wisdom
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Wisdom-save"
                        name="Wisdom-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input name="Wisdom-save-prof" type="checkbox" />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Intelligence-save"
                      >
                        Intelligence
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Intelligence-save"
                        name="Intelligence-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Intelligence-save-prof"
                        name="Intelligence-save-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="Charisma-save"
                      >
                        Charisma
                      </Label>
                      <input
                        className="saves-total-input"
                        id="Charisma-save"
                        name="Charisma-save"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Charisma-save-prof"
                        name="Charisma-save-prof"
                        type="checkbox"
                      />
                    </li>
                  </ul>
                  <div className="Label flex justify-center font-bold">
                    Saving Throws
                  </div>
                </div>

                {/* skills */}
                <div className="skills list-section box flex flex-col-reverse rounded-xl border-2 border-black">
                  <ul>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Acrobatics">
                        Acrobatics <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Acrobatics"
                        name="Acrobatics"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Acrobatics-expertise"
                        name="Acrobatics-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Acrobatics-prof"
                        name="Acrobatics-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="Animal Handling"
                      >
                        Animal Handling <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Animal Handling"
                        name="Animal Handling"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Animal Handling-expertise"
                        name="Animal Handling-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Animal Handling-prof"
                        name="Animal Handling-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Arcana">
                        Arcana <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Arcana"
                        name="Arcana"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Arcana-expertise"
                        name="Arcana-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Arcana-prof"
                        name="Arcana-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Athletics">
                        Athletics <span className="skill">(Str)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Athletics"
                        name="Athletics"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Athletics-expertise"
                        name="Athletics-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Athletics-prof"
                        name="Athletics-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Deception">
                        Deception <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Deception"
                        name="Deception"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Deception-expertise"
                        name="Deception-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Deception-prof"
                        name="Deception-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="History">
                        History <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="History"
                        name="History"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="History-expertise"
                        name="History-expertise"
                        type="checkbox"
                      />
                      <input
                        id="History-prof"
                        name="History-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Insight">
                        Insight <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Insight"
                        name="Insight"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Insight-expertise"
                        name="Insight-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Insight-prof"
                        name="Insight-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="Intimidation"
                      >
                        Intimidation <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Intimidation"
                        name="Intimidation"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Intimidation-expertise"
                        name="Intimidation-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Intimidation-prof"
                        name="Intimidation-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="Investigation"
                      >
                        Investigation <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Investigation"
                        name="Investigation"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Investigation-expertise"
                        name="Investigation-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Investigation-prof"
                        name="Investigation-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Medicine">
                        Medicine <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Medicine"
                        name="Medicine"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Medicine-expertise"
                        name="Medicine-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Medicine-prof"
                        name="Medicine-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Nature">
                        Nature <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Nature"
                        name="Nature"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Nature-expertise"
                        name="Nature-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Nature-prof"
                        name="Nature-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Perception">
                        Perception <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Perception"
                        name="Perception"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Perception-expertise"
                        name="Perception-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Perception-prof"
                        name="Perception-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Performance">
                        Performance <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Performance"
                        name="Performance"
                        placeholder="+0"
                        type="text"
                      />
                      <input id="Performance-expertise" name="Performance-expertise" type="checkbox" />
                      <input id="Performance-prof" name="Performance-prof" type="checkbox" />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Persuation">
                        Persuation <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Persuation"
                        name="Persuation"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Persuation-expertise"
                        name="Persuation-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Persuation-prof"
                        name="Persuation-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Religion">
                        Religion <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Religion"
                        name="Religion"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Religion-expertise"
                        name="Religion-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Religion-prof"
                        name="Religion-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="Sleight of Hand"
                      >
                        Sleight of Hand <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Sleight of Hand"
                        name="Sleight of Hand"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Sleight of Hand-expertise"
                        name="Sleight of Hand-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Sleight of Hand-prof"
                        name="Sleight of Hand-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="Stealth">
                        Stealth <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Stealth"
                        name="Stealth"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Stealth-expertise"
                        name="Stealth-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Stealth-prof"
                        name="Stealth-prof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li mb-2">
                      <Label className="ml-1 text-[10px]" htmlFor="Survival">
                        Survival <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        id="Survival"
                        name="Survival"
                        placeholder="+0"
                        type="text"
                      />
                      <input
                        id="Survival-expertise"
                        name="Survival-expertise"
                        type="checkbox"
                      />
                      <input
                        id="Survival-prof"
                        name="Survival-prof"
                        type="checkbox"
                      />
                    </li>
                  </ul>
                  <div>
                    <div className="Label mx-1 flex items-center justify-between">
                      <span className="text-xs">Prof / Exp</span>
                      <span className="mr-2">Skills</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* passive perception */}
            <div className="passive-perception box mt-2 flex flex-row-reverse">
              <div className="Label-container flex h-[21px] items-center self-center border-2 border-l-0 border-black ">
                <Label
                  className="p-1 font-light text-black"
                  htmlFor="passiveperception"
                >
                  Passive Perception (Wisdom)
                </Label>
              </div>
              <input
                id="passiveperception"
                name="passiveperception"
                placeholder="10"
                className="w-10 rounded-md border-2 border-black text-center"
              />
            </div>

            {/* other prof and languages */}
            <div className="otherprofs box textblock mt-2 flex flex-col-reverse items-center">
              <Label
                className="w-[220px] rounded-sm border-2 border-t-0 border-black text-center text-xs"
                htmlFor="otherprofs"
              >
                Other Proficiencies and Languages
              </Label>
              <textarea
                className="h-[150px] w-[250px] rounded-sm border-2 border-black"
                id="otherprofs"
                name="otherprofs"
              ></textarea>
            </div>
          </section>

          {/* ac, init, spd, hp, hitdice, death saves, atks / spellcasting, equipment */}
          <section className="flex w-1/3 flex-col">
            {/* ac - death saves */}
            <section className="combat flex flex-col bg-slate-200">
              {/* ac, init, and spd */}
              <div className="flex justify-around">
                <div className="armorclassName">
                  <div className="flex flex-col-reverse">
                    <Label
                      className="w-[60px] self-center rounded-sm border-2 border-t-0 border-black bg-white text-center text-xs"
                      htmlFor="ac"
                    >
                      Armor Class
                    </Label>
                    <input
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="ac"
                      name="ac"
                      placeholder="10"
                      type="text"
                    />
                  </div>
                </div>
                <div className="initiative">
                  <div className="flex flex-col-reverse">
                    <Label
                      className="h-[25px] w-[60px] self-center rounded-sm border-2 border-t-0 border-black bg-white text-center text-xs"
                      htmlFor="initiative"
                    >
                      Initiative
                    </Label>
                    <input
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="initiative"
                      name="initiative"
                      placeholder="Dex"
                      type="text"
                    />
                  </div>
                </div>
                <div className="speed">
                  <div className="flex flex-col-reverse">
                    <Label
                      className="h-[25px] w-[60px] self-center rounded-sm border-2 border-t-0 border-black bg-white text-center text-xs"
                      htmlFor="speed"
                    >
                      Speed
                    </Label>
                    <input
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="speed"
                      name="speed"
                      placeholder="30ft"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* hp */}
              <div className="hp flex flex-col">
                <div className="regular ">
                  <div className="max mx-2 mt-1 flex items-center justify-center border-2 border-b-0 border-black pb-2">
                    <Label
                      className="py-1 text-xs text-black/70"
                      htmlFor="maxhp"
                    >
                      Hit Point Maximum
                    </Label>
                    <input
                      className="ml-2 h-[15px] border-b-2 border-black/30 text-center text-xs text-black/70"
                      id="maxhp"
                      name="maxhp"
                      placeholder="10"
                      type="text"
                    />
                  </div>
                  <div className="current mx-2 flex flex-col-reverse items-center border-2 border-t-0 border-black">
                    <Label className="mb-1 mt-2 font-bold" htmlFor="currenthp">
                      Current Hit Points
                    </Label>
                    <input
                      placeholder="0"
                      className="h-[60px] w-5/6 text-center text-2xl"
                      id="currenthp"
                      name="currenthp"
                      type="text"
                    />
                  </div>
                </div>
                <div className="temporary mx-2 mt-1 flex flex-col-reverse items-center justify-center border-2 border-black">
                  <Label className="mb-1 mt-2 font-bold" htmlFor="temphp">
                    Temporary Hit Points
                  </Label>
                  <input
                    placeholder="0"
                    className="mt-1 h-[60px] w-5/6 text-center text-2xl"
                    id="temphp"
                    name="temphp"
                    type="text"
                  />
                </div>
              </div>

              {/* hit dice / death saves */}
              <div className="mb-2 mt-4 flex justify-around">
                <div className="hitdice flex w-1/3 flex-col justify-center">
                  {/* hitdice / total */}
                  <div className="flex w-[130px] flex-col items-center justify-center rounded-lg border-2 border-black bg-white">
                    <div className="total flex items-center">
                      <Label htmlFor="totalhd">Total</Label>
                      <input
                        className="ml-2 w-[60px]"
                        id="totalhd"
                        name="totalhd"
                        placeholder="2d10"
                        type="text"
                      />
                    </div>
                    <div className="remaining flex flex-col-reverse justify-center">
                      <Label className="self-center" htmlFor="remaininghd">
                        Hit Dice
                      </Label>
                      <input
                        className="h-[45px] w-[100px] text-center"
                        id="remaininghd"
                        name="remaininghd"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="deathsaves flex w-1/3 flex-col justify-center">
                  <div className="flex h-[88px] w-[130px] flex-col-reverse items-center justify-between rounded-lg border-2 border-black bg-white">
                    <Label className="justify-center">Death Saves</Label>
                    <div className="marks p-2">
                      <div className="deathsuccesses mb-1 flex">
                        <Label className="text-xs">Successes</Label>
                        <div className="bubbles ml-2 flex space-x-1">
                          <input
                            id="deathsuccess1"
                            name="deathsuccess1"
                            type="checkbox"
                          />
                          <input
                            id="deathsuccess2"
                            name="deathsuccess2"
                            type="checkbox"
                          />
                          <input
                            id="deathsuccess3"
                            name="deathsuccess3"
                            type="checkbox"
                          />
                        </div>
                      </div>
                      <div className="deathfails flex items-center justify-between">
                        <Label className="text-xs">Failures</Label>
                        <div className="bubbles ml-2 flex space-x-1">
                          <input
                            id="deathfail1"
                            name="deathfail1"
                            type="checkbox"
                          />
                          <input
                            id="deathfail2"
                            name="deathfail2"
                            type="checkbox"
                          />
                          <input
                            id="deathfail3"
                            name="deathfail3"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* attacks and spellcasting */}
            <section className="attacksandspellcasting mt-2">
              <div className="flex h-[200px] flex-col-reverse items-center justify-between rounded-xl border-2 border-black">
                <Label className="my-1 w-full bg-slate-100 text-center">
                  Attacks & Spellcasting
                </Label>
                <table>
                  <thead>
                    <tr className="text-xs text-black/50">
                      <th>Name</th>
                      <th>Atk Bonus</th>
                      <th>Damage/Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkname1"
                          name="atkname1"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkbonus1"
                          name="atkbonus1"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkdamage1"
                          name="atkdamage1"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkname2"
                          name="atkname2"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkbonus2"
                          name="atkbonus2"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkdamage2"
                          name="atkdamage2"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkname3"
                          name="atkname3"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkbonus3"
                          name="atkbonus3"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          className="w-24 bg-black/10"
                          id="atkdamage3"
                          name="atkdamage3"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* equipment */}
            <section className="equipment mt-2 flex flex-col items-center rounded-lg border-2 border-black">
              <div className="flex p-1">
                <div className="money">
                  <ul className="space-y-[2px]">
                    <li className="flex items-center">
                      <Label className="coins-label" htmlFor="cp">
                        cp
                      </Label>
                      <input
                        placeholder="0"
                        className="coins-input"
                        id="cp"
                        name="cp"
                      />
                    </li>
                    <li className="flex items-center">
                      <Label className="coins-label" htmlFor="sp">
                        sp
                      </Label>
                      <input
                        placeholder="0"
                        className="coins-input"
                        id="sp"
                        name="sp"
                      />
                    </li>
                    <li className="flex items-center">
                      <Label className="coins-label" htmlFor="ep">
                        ep
                      </Label>
                      <input
                        placeholder="0"
                        className="coins-input"
                        id="ep"
                        name="ep"
                      />
                    </li>
                    <li className="flex items-center">
                      <Label className="coins-label" htmlFor="gp">
                        gp
                      </Label>
                      <input
                        placeholder="0"
                        className="coins-input"
                        id="gp"
                        name="gp"
                      />
                    </li>
                    <li className="flex items-center">
                      <Label className="coins-label" htmlFor="pp">
                        pp
                      </Label>
                      <input
                        placeholder="0"
                        className="coins-input"
                        id="pp"
                        name="pp"
                      />
                    </li>
                  </ul>
                </div>
                <textarea
                  className="ml-3"
                  id="Equipmentlist"
                  name="Equipmentlist"
                  placeholder="Equipment list here"
                ></textarea>
              </div>
              <Label className="mb-1 w-full bg-slate-100 text-center">
                Equipment
              </Label>
            </section>
          </section>

          {/* personalite, Ideals, Bonds, Flaws, features / traits */}
          <section className="w-1/3">
            {/* not traits */}
            <section className="flavor m-5 mt-0 flex flex-col space-y-3 rounded-lg bg-slate-400 p-2">
              <div className="personality flex flex-col-reverse items-center rounded-md border-2 border-black">
                <Label className="personality-label" htmlFor="personality">
                  Personality
                </Label>
                <textarea
                  className="personality-textarea"
                  id="personality"
                  name="personality"
                ></textarea>
              </div>
              <div className="ideals flex flex-col-reverse items-center rounded-md border-2 border-black">
                <Label className="personality-label" htmlFor="ideals">
                  Ideals
                </Label>
                <textarea
                  className="personality-textarea"
                  id="ideals"
                  name="ideals"
                ></textarea>
              </div>
              <div className="bonds flex flex-col-reverse items-center rounded-md border-2 border-black">
                <Label className="personality-label" htmlFor="bonds">
                  Bonds
                </Label>
                <textarea
                  className="personality-textarea"
                  id="bonds"
                  name="bonds"
                ></textarea>
              </div>
              <div className="flaws flex flex-col-reverse items-center rounded-md border-2 border-black">
                <Label className="personality-label" htmlFor="flaws">
                  Flaws
                </Label>
                <textarea
                  className="personality-textarea"
                  id="flaws"
                  name="flaws"
                ></textarea>
              </div>
            </section>
            <section className="features m-5 flex flex-col items-center rounded-md border-2 border-black">
              <div className="flex w-full flex-col-reverse">
                <Label
                  className="w-full rounded-sm bg-slate-100 p-[2px] text-center"
                  htmlFor="features"
                >
                  Features & Traits
                </Label>
                <textarea
                  className="h-[302px] w-full p-2"
                  id="features"
                  name="features"
                ></textarea>
              </div>
            </section>
          </section>
        </main>
      </form>
    </div>
  );
}

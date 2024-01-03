"use client";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/trpc";

export default function CharacterData(props: {
  character: CharacterForm;
  characterId: string;
}) {
  const { user } = useUser();
  const { character, characterId } = props;
  console.log(character);

  if (!user) return null;

  const { mutate: updateCharacter } = api.updateCharacterSheet.useMutation();

  const saveCharacterSheet: SubmitHandler<CharacterForm> = (data) => {
    updateCharacter({
      id: characterId,
      userId: user.id,
      charname: data.charname,
      classname: data.classname,
      background: data.background,
      playername: data.playername,
      race: data.race,
      alignment: data.alignment,
      level: data.level,
      strengthscore: data.strengthscore,
      dexterityscore: data.dexterityscore,
      constitutionscore: data.constitutionscore,
      wisdomscore: data.wisdomscore,
      intelligencescore: data.intelligencescore,
      charismascore: data.charismascore,
      inspiration: data.inspiration,
      proficiencybonus: data.proficiencybonus,
      strengthsave: data.strengthsave,
      strengthsaveprof: data.strengthsaveprof,
      dexteritysave: data.dexteritysave,
      dexteritysaveprof: data.dexteritysaveprof,
      constitutionsave: data.constitutionsave,
      constitutionsaveprof: data.constitutionsaveprof,
      wisdomsave: data.wisdomsave,
      wisdomsaveprof: data.wisdomsaveprof,
      intelligencesave: data.intelligencesave,
      intelligencesaveprof: data.intelligencesaveprof,
      charismasave: data.charismasave,
      charismasaveprof: data.charismasaveprof,
      acrobatics: data.acrobatics,
      acrobaticsexpertise: data.acrobaticsexpertise,
      acrobaticsprof: data.acrobaticsprof,
      animalhandling: data.animalhandling,
      animalhandlingexpertise: data.animalhandlingexpertise,
      animalhandlingprof: data.animalhandlingprof,
      arcana: data.arcana,
      arcanaexpertise: data.arcanaexpertise,
      arcanaprof: data.arcanaprof,
      athletics: data.athletics,
      athleticsexpertise: data.athleticsexpertise,
      athleticsprof: data.athleticsprof,
      deception: data.deception,
      deceptionexpertise: data.deceptionexpertise,
      deceptionprof: data.deceptionprof,
      history: data.history,
      historyexpertise: data.historyexpertise,
      historyprof: data.historyprof,
      insight: data.insight,
      insightexpertise: data.insightexpertise,
      insightprof: data.insightprof,
      intimidation: data.intimidation,
      intimidationexpertise: data.intimidationexpertise,
      intimidationprof: data.intimidationprof,
      investigation: data.investigation,
      investigationexpertise: data.investigationexpertise,
      investigationprof: data.investigationprof,
      medicine: data.medicine,
      medicineexpertise: data.medicineexpertise,
      medicineprof: data.medicineprof,
      nature: data.nature,
      natureexpertise: data.natureexpertise,
      natureprof: data.natureprof,
      perception: data.perception,
      perceptionexpertise: data.perceptionexpertise,
      perceptionprof: data.perceptionprof,
      performance: data.performance,
      performanceexpertise: data.performanceexpertise,
      performanceprof: data.performanceprof,
      persuasion: data.persuasion,
      persuasionexpertise: data.persuasionexpertise,
      persuasionprof: data.persuasionprof,
      religion: data.religion,
      religionexpertise: data.religionexpertise,
      religionprof: data.religionprof,
      sleightofhand: data.sleightofhand,
      sleightofhandexpertise: data.sleightofhandexpertise,
      sleightofhandprof: data.sleightofhandprof,
      stealth: data.stealth,
      stealthexpertise: data.stealthexpertise,
      stealthprof: data.stealthprof,
      survival: data.survival,
      survivalexpertise: data.survivalexpertise,
      survivalprof: data.survivalprof,
      passiveperception: data.passiveperception,
      otherprofs: data.otherprofs,
      ac: data.ac,
      initiative: data.initiative,
      speed: data.speed,
      maxhp: data.maxhp,
      currenthp: data.currenthp,
      temphp: data.temphp,
      totalhd: data.totalhd,
      remaininghd: data.remaininghd,
      deathsuccess1: data.deathsuccess1,
      deathsuccess2: data.deathsuccess2,
      deathsuccess3: data.deathsuccess3,
      deathfail1: data.deathfail1,
      deathfail2: data.deathfail2,
      deathfail3: data.deathfail3,
      atkname1: data.atkname1,
      atkbonus1: data.atkbonus1,
      atkdamage1: data.atkdamage1,
      atkname2: data.atkname2,
      atkbonus2: data.atkbonus2,
      atkdamage2: data.atkdamage2,
      atkname3: data.atkname3,
      atkbonus3: data.atkbonus3,
      atkdamage3: data.atkdamage3,
      cp: data.cp,
      sp: data.sp,
      ep: data.ep,
      gp: data.gp,
      pp: data.pp,
      equipmentlist: data.equipmentlist,
      personality: data.personality,
      ideals: data.ideals,
      bonds: data.bonds,
      flaws: data.flaws,
      features: data.features,
    });
  };

  const { register, handleSubmit } = useForm<CharacterForm>({
    defaultValues: {
      charname: character.charname ? character.charname : "",
      classname: character.classname ? character.classname : "",
      background: character.background ? character.background : "",
      playername: character.playername ? character.playername : "",
      race: character.race ? character.race : "",
      alignment: character.alignment ? character.alignment : "",
      level: character.level ? character.level : 1,
      strengthscore: character.strengthscore ? character.strengthscore : 10,
      dexterityscore: character.dexterityscore ? character.dexterityscore : 10,
      constitutionscore: character.constitutionscore
        ? character.constitutionscore
        : 10,
      wisdomscore: character.wisdomscore ? character.wisdomscore : 10,
      intelligencescore: character.intelligencescore
        ? character.intelligencescore
        : 10,
      charismascore: character.charismascore ? character.charismascore : 10,
      inspiration: character.inspiration ? character.inspiration : false,
      proficiencybonus: character.proficiencybonus
        ? character.proficiencybonus
        : 2,
      strengthsave: character.strengthsave ? character.strengthsave : 0,
      strengthsaveprof: character.strengthsaveprof
        ? character.strengthsaveprof
        : false,
      dexteritysave: character.dexteritysave ? character.dexteritysave : 0,
      dexteritysaveprof: character.dexteritysaveprof
        ? character.dexteritysaveprof
        : false,
      constitutionsave: character.constitutionsave
        ? character.constitutionsave
        : 0,
      constitutionsaveprof: character.constitutionsaveprof
        ? character.constitutionsaveprof
        : false,
      wisdomsave: character.wisdomsave ? character.wisdomsave : 0,
      wisdomsaveprof: character.wisdomsaveprof
        ? character.wisdomsaveprof
        : false,
      intelligencesave: character.intelligencesave
        ? character.intelligencesave
        : 0,
      intelligencesaveprof: character.intelligencesaveprof
        ? character.intelligencesaveprof
        : false,
      charismasave: character.charismasave ? character.charismasave : 0,
      charismasaveprof: character.charismasaveprof
        ? character.charismasaveprof
        : false,
      acrobatics: character.acrobatics ? character.acrobatics : 0,
      acrobaticsexpertise: character.acrobaticsexpertise
        ? character.acrobaticsexpertise
        : false,
      acrobaticsprof: character.acrobaticsprof
        ? character.acrobaticsprof
        : false,
      animalhandling: character.animalhandling ? character.animalhandling : 0,
      animalhandlingexpertise: character.animalhandlingexpertise
        ? character.animalhandlingexpertise
        : false,
      animalhandlingprof: character.animalhandlingprof
        ? character.animalhandlingprof
        : false,
      arcana: character.arcana ? character.arcana : 0,
      arcanaexpertise: character.arcanaexpertise
        ? character.arcanaexpertise
        : false,
      arcanaprof: character.arcanaprof ? character.arcanaprof : false,
      athletics: character.athletics ? character.athletics : 0,
      athleticsexpertise: character.athleticsexpertise
        ? character.athleticsexpertise
        : false,
      athleticsprof: character.athleticsprof ? character.athleticsprof : false,
      deception: character.deception ? character.deception : 0,
      deceptionexpertise: character.deceptionexpertise
        ? character.deceptionexpertise
        : false,
      deceptionprof: character.deceptionprof ? character.deceptionprof : false,
      history: character.history ? character.history : 0,
      historyexpertise: character.historyexpertise
        ? character.historyexpertise
        : false,
      historyprof: character.historyprof ? character.historyprof : false,
      insight: character.insight ? character.insight : 0,
      insightexpertise: character.insightexpertise
        ? character.insightexpertise
        : false,
      insightprof: character.insightprof ? character.insightprof : false,
      intimidation: character.intimidation ? character.intimidation : 0,
      intimidationexpertise: character.intimidationexpertise
        ? character.intimidationexpertise
        : false,
      intimidationprof: character.intimidationprof
        ? character.intimidationprof
        : false,
      investigation: character.investigation ? character.investigation : 0,
      investigationexpertise: character.investigationexpertise
        ? character.investigationexpertise
        : false,
      investigationprof: character.investigationprof
        ? character.investigationprof
        : false,
      medicine: character.medicine ? character.medicine : 0,
      medicineexpertise: character.medicineexpertise
        ? character.medicineexpertise
        : false,
      medicineprof: character.medicineprof ? character.medicineprof : false,
      nature: character.nature ? character.nature : 0,
      natureexpertise: character.natureexpertise
        ? character.natureexpertise
        : false,
      natureprof: character.natureprof ? character.natureprof : false,
      perception: character.perception ? character.perception : 0,
      perceptionexpertise: character.perceptionexpertise
        ? character.perceptionexpertise
        : false,
      perceptionprof: character.perceptionprof
        ? character.perceptionprof
        : false,
      performance: character.performance ? character.performance : 0,
      performanceexpertise: character.performanceexpertise
        ? character.performanceexpertise
        : false,
      performanceprof: character.performanceprof
        ? character.performanceprof
        : false,
      persuasion: character.persuasion ? character.persuasion : 0,
      persuasionexpertise: character.persuasionexpertise
        ? character.persuasionexpertise
        : false,
      persuasionprof: character.persuasionprof
        ? character.persuasionprof
        : false,
      religion: character.religion ? character.religion : 0,
      religionexpertise: character.religionexpertise
        ? character.religionexpertise
        : false,
      religionprof: character.religionprof ? character.religionprof : false,
      sleightofhand: character.sleightofhand ? character.sleightofhand : 0,
      sleightofhandexpertise: character.sleightofhandexpertise
        ? character.sleightofhandexpertise
        : false,
      sleightofhandprof: character.sleightofhandprof
        ? character.sleightofhandprof
        : false,
      stealth: character.stealth ? character.stealth : 0,
      stealthexpertise: character.stealthexpertise
        ? character.stealthexpertise
        : false,
      stealthprof: character.stealthprof ? character.stealthprof : false,
      survival: character.survival ? character.survival : 0,
      survivalexpertise: character.survivalexpertise
        ? character.survivalexpertise
        : false,
      survivalprof: character.survivalprof ? character.survivalprof : false,
      passiveperception: character.passiveperception
        ? character.passiveperception
        : 0,
      otherprofs: character.otherprofs ? character.otherprofs : "",
      ac: character.ac ? character.ac : 10,
      initiative: character.initiative ? character.initiative : 0,
      speed: character.speed ? character.speed : 30,
      maxhp: character.maxhp ? character.maxhp : 0,
      currenthp: character.currenthp ? character.currenthp : 0,
      temphp: character.temphp ? character.temphp : 0,
      totalhd: character.totalhd ? character.totalhd : "",
      remaininghd: character.remaininghd ? character.remaininghd : 0,
      deathsuccess1: character.deathsuccess1 ? character.deathsuccess1 : false,
      deathsuccess2: character.deathsuccess2 ? character.deathsuccess2 : false,
      deathsuccess3: character.deathsuccess3 ? character.deathsuccess3 : false,
      deathfail1: character.deathfail1 ? character.deathfail1 : false,
      deathfail2: character.deathfail2 ? character.deathfail2 : false,
      deathfail3: character.deathfail3 ? character.deathfail3 : false,
      atkname1: character.atkname1 ? character.atkname1 : "",
      atkbonus1: character.atkbonus1 ? character.atkbonus1 : 0,
      atkdamage1: character.atkdamage1 ? character.atkdamage1 : "",
      atkname2: character.atkname2 ? character.atkname2 : "",
      atkbonus2: character.atkbonus2 ? character.atkbonus2 : 0,
      atkdamage2: character.atkdamage2 ? character.atkdamage2 : "",
      atkname3: character.atkname3 ? character.atkname3 : "",
      atkbonus3: character.atkbonus3 ? character.atkbonus3 : 0,
      atkdamage3: character.atkdamage3 ? character.atkdamage3 : "",
      cp: character.cp ? character.cp : 0,
      sp: character.sp ? character.sp : 0,
      ep: character.ep ? character.ep : 0,
      gp: character.gp ? character.gp : 0,
      pp: character.pp ? character.pp : 0,
      equipmentlist: character.equipmentlist ? character.equipmentlist : "",
      personality: character.personality ? character.personality : "",
      ideals: character.ideals ? character.ideals : "",
      bonds: character.bonds ? character.bonds : "",
      flaws: character.flaws ? character.flaws : "",
      features: character.features ? character.features : "",
    },
  });

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(saveCharacterSheet)}
        className="charsheet flex w-[1000px] flex-col bg-white align-middle"
      >
        {/* header with char name, basic class info */}
        <header className="flex">
          <section className="charname m-auto ml-1 flex w-1/3 flex-col-reverse rounded-md border-2 border-r-0 border-black bg-slate-400 p-2">
            <Label htmlFor="charname">Character Name</Label>
            <input
              {...register("charname", {
                onBlur: handleSubmit(saveCharacterSheet),
              })}
              className="px-1"
              id="charname"
              name="charname"
            />
          </section>
          <section className="misc m-1 ml-0 w-2/3 rounded-md border-2 border-black px-1">
            <ul className="flex flex-wrap py-3">
              {/* ... other list items ... */}
              <li className="header-li">
                <Label className="mb-2" htmlFor="classname">
                  Class
                </Label>
                <input
                  {...register("classname", {
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
                  className="header-input"
                  id="classname"
                  name="classname"
                  placeholder="Paladin"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="background">
                  Background
                </Label>
                <input
                  {...register("background", {
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
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
                  {...register("playername", {
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
                  className="header-input"
                  id="playername"
                  name="playername"
                  placeholder="Player Name"
                />
              </li>
              <li className="header-li">
                <Label className="mb-2" htmlFor="race">
                  Race
                </Label>
                <input
                  {...register("race", {
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
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
                  {...register("alignment", {
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
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
                  type="number"
                  {...register("level", {
                    valueAsNumber: true,
                    onBlur: handleSubmit(saveCharacterSheet),
                  })}
                  className="header-input"
                  id="level"
                  name="level"
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
                        htmlFor="strengthscore"
                      >
                        Strength
                      </Label>
                      <input
                        type="number"
                        {...register("strengthscore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="strengthscore"
                        name="strengthscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.strengthscore
                            ? Math.floor((character.strengthscore - 10) / 2)
                            : 0
                        }`}
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
                        htmlFor="dexterityscore"
                      >
                        Dexterity
                      </Label>
                      <input
                        type="number"
                        {...register("dexterityscore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="dexterityscore"
                        name="dexterityscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.dexterityscore
                            ? Math.floor((character.dexterityscore - 10) / 2)
                            : 0
                        }`}
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
                        htmlFor="constitutionscore"
                      >
                        Constitution
                      </Label>
                      <input
                        type="number"
                        {...register("constitutionscore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="constitutionscore"
                        name="constitutionscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.constitutionscore
                            ? Math.floor((character.constitutionscore - 10) / 2)
                            : 0
                        }`}
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
                        htmlFor="wisdomscore"
                      >
                        Wisdom
                      </Label>
                      <input
                        type="number"
                        {...register("wisdomscore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="wisdomscore"
                        name="wisdomscore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.wisdomscore
                            ? Math.floor((character.wisdomscore - 10) / 2)
                            : 0
                        }`}
                        className="ability-modifier-input"
                        id="wisdommod"
                        name="wisdommod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-[9px] font-bold"
                        htmlFor="intelligencescore"
                      >
                        Intelligence
                      </Label>
                      <input
                        type="number"
                        {...register("intelligencescore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="intelligencescore"
                        name="intelligencescore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.intelligencescore
                            ? Math.floor((character.intelligencescore - 10) / 2)
                            : 0
                        }`}
                        className="ability-modifier-input"
                        id="intelligencemod"
                        name="intelligencemod"
                        placeholder="+0"
                      />
                    </div>
                  </li>
                  <li className="ability-li">
                    <div className="score flex flex-col">
                      <Label
                        className="text-center text-xs font-bold"
                        htmlFor="charismascore"
                      >
                        Charisma
                      </Label>
                      <input
                        type="number"
                        {...register("charismascore", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="ability-score-input"
                        id="charismascore"
                        name="charismascore"
                        placeholder="10"
                      />
                    </div>
                    <div className="modifier flex justify-center">
                      <input
                        value={`+${
                          character.charismascore
                            ? Math.floor((character.charismascore - 10) / 2)
                            : 0
                        }`}
                        className="ability-modifier-input"
                        id="charismamod"
                        name="charismamod"
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
                    checked={
                      character.inspiration ? character.inspiration : false
                    }
                    {...register("inspiration")}
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
                    type="number"
                    {...register("proficiencybonus", { valueAsNumber: true })}
                    className="w-8 text-center"
                    id="proficiencybonus"
                    name="proficiencybonus"
                    placeholder="+2"
                  />
                </div>

                {/* saves */}
                <div className="saves list-section box my-2 flex flex-col-reverse rounded-xl border-2 border-black p-1">
                  <ul className="flex flex-col items-baseline justify-between">
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="strengthsave"
                      >
                        Strength
                      </Label>
                      <input
                        type="number"
                        {...register("strengthsave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="strengthsave"
                        name="strengthsave"
                        placeholder="+0"
                      />
                      <input
                        {...register("strengthsaveprof")}
                        id="strengthsaveprof"
                        name="strengthsaveprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="dexteritysave"
                      >
                        Dexterity
                      </Label>
                      <input
                        {...register("dexteritysave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="dexteritysave"
                        name="dexteritysave"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("dexteritysaveprof")}
                        id="dexteritysaveprof"
                        name="dexteritysaveprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="constitutionsave"
                      >
                        Constitution
                      </Label>
                      <input
                        {...register("constitutionsave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="constitutionsave"
                        name="constitutionsave"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("constitutionsaveprof")}
                        id="constitutionsaveprof"
                        name="constitutionsaveprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="wisdomsave"
                      >
                        Wisdom
                      </Label>
                      <input
                        {...register("wisdomsave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="wisdomsave"
                        name="wisdomsave"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("wisdomsaveprof")}
                        id="wisdomsaveprof"
                        name="wisdomsaveprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="intelligencesave"
                      >
                        Intelligence
                      </Label>
                      <input
                        {...register("intelligencesave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="intelligencesave"
                        name="intelligencesave"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("intelligencesaveprof")}
                        id="intelligencesaveprof"
                        name="intelligencesaveprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="saves-li">
                      <Label
                        className="ml-2 text-[11px] font-bold"
                        htmlFor="charismasave"
                      >
                        Charisma
                      </Label>
                      <input
                        {...register("charismasave", {
                          valueAsNumber: true,
                          onBlur: handleSubmit(saveCharacterSheet),
                        })}
                        className="saves-total-input"
                        id="charismasave"
                        name="charismasave"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("charismasaveprof")}
                        id="charismasaveprof"
                        name="charismasaveprof"
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
                      <Label className="ml-1 text-[10px]" htmlFor="acrobatics">
                        Acrobatics <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        type="number"
                        {...register("acrobatics", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="acrobatics"
                        name="acrobatics"
                        placeholder="+0"
                      />
                      <input
                        {...register("acrobaticsexpertise")}
                        id="acrobaticsexpertise"
                        name="acrobaticsexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("acrobaticsprof")}
                        id="acrobaticsprof"
                        name="acrobaticsprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="animalhandling"
                      >
                        Animal Handling <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        {...register("animalhandling", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="animalhandling"
                        name="animalhandling"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("animalhandlingexpertise")}
                        id="animalhandlingexpertise"
                        name="animalhandlingexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("animalhandlingprof")}
                        id="animalhandlingprof"
                        name="animalhandlingprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="arcana">
                        Arcana <span className="skill">(Int)</span>
                      </Label>
                      <input
                        {...register("arcana", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="arcana"
                        name="arcana"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("arcanaexpertise")}
                        id="arcanaexpertise"
                        name="arcanaexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("arcanaprof")}
                        id="arcanaprof"
                        name="arcanaprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="athletics">
                        Athletics <span className="skill">(Str)</span>
                      </Label>
                      <input
                        {...register("athletics", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="athletics"
                        name="athletics"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("athleticsexpertise")}
                        id="athleticsexpertise"
                        name="athleticsexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("athleticsprof")}
                        id="athleticsprof"
                        name="athleticsprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="deception">
                        Deception <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        {...register("deception", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="deception"
                        name="deception"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("deceptionexpertise")}
                        id="deceptionexpertise"
                        name="deceptionexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("deceptionprof")}
                        id="deceptionprof"
                        name="deceptionprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="history">
                        History <span className="skill">(Int)</span>
                      </Label>
                      <input
                        {...register("history", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="history"
                        name="history"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("historyexpertise")}
                        id="historyexpertise"
                        name="historyexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("historyprof")}
                        id="historyprof"
                        name="historyprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="insight">
                        Insight <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        {...register("insight", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="insight"
                        name="insight"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("insightexpertise")}
                        id="insightexpertise"
                        name="insightexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("insightprof")}
                        id="insightprof"
                        name="insightprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="intimidation"
                      >
                        Intimidation <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        {...register("intimidation", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="intimidation"
                        name="intimidation"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("intimidationexpertise")}
                        id="intimidationexpertise"
                        name="intimidationexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("intimidationprof")}
                        id="intimidationprof"
                        name="intimidationprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="investigation"
                      >
                        Investigation <span className="skill">(Int)</span>
                      </Label>
                      <input
                        {...register("investigation", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="investigation"
                        name="investigation"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("investigationexpertise")}
                        id="investigationexpertise"
                        name="investigationexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("investigationprof")}
                        id="investigationprof"
                        name="investigationprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="medicine">
                        Meadicine <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        {...register("medicine", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="medicine"
                        name="medicine"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("medicineexpertise")}
                        id="medicineexpertise"
                        name="medicineexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("medicineprof")}
                        id="medicineprof"
                        name="medicineprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="nature">
                        Nature <span className="skill">(Int)</span>
                      </Label>
                      <input
                        {...register("nature", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="nature"
                        name="nature"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("natureexpertise")}
                        id="natureexpertise"
                        name="natureexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("natureprof")}
                        id="natureprof"
                        name="natureprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="perception">
                        Perception <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        {...register("perception", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="perception"
                        name="perception"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("perceptionexpertise")}
                        id="perceptionexpertise"
                        name="perceptionexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("perceptionprof")}
                        id="perceptionprof"
                        name="perceptionprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="performance">
                        Performance <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        {...register("performance", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="performance"
                        name="performance"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("performanceexpertise")}
                        id="performanceexpertise"
                        name="performanceexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("performanceprof")}
                        id="performanceprof"
                        name="performanceprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="persuasion">
                        Persuation <span className="skill">(Cha)</span>
                      </Label>
                      <input
                        {...register("persuasion", { valueAsNumber: true })}
                        className="skills-total-input"
                        id="persuasion"
                        name="persuasion"
                        placeholder="+0"
                        type="number"
                      />
                      <input
                        {...register("persuasionexpertise")}
                        id="persuationexpertise"
                        name="persuationexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("persuasionprof")}
                        id="persuationprof"
                        name="persuationprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="religion">
                        Religion <span className="skill">(Int)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        {...register("religion", { valueAsNumber: true })}
                        id="religion"
                        name="religion"
                        type="number"
                      />
                      <input
                        {...register("religionexpertise")}
                        id="religionexpertise"
                        name="religionexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("religionprof")}
                        id="religionprof"
                        name="religionprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label
                        className="ml-1 text-[10px]"
                        htmlFor="sleightofhand"
                      >
                        Sleight of Hand <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        {...register("sleightofhand", { valueAsNumber: true })}
                        id="sleightofhand"
                        name="sleightofhand"
                        type="number"
                      />
                      <input
                        {...register("sleightofhandexpertise")}
                        id="sleightofhandexpertise"
                        name="sleightofhandexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("sleightofhandprof")}
                        id="sleightofhandprof"
                        name="sleightofhandprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li">
                      <Label className="ml-1 text-[10px]" htmlFor="stealth">
                        Stealth <span className="skill">(Dex)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        {...register("stealth", { valueAsNumber: true })}
                        id="stealth"
                        name="stealth"
                        type="number"
                      />
                      <input
                        {...register("stealthexpertise")}
                        id="stealthexpertise"
                        name="stealthexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("stealthprof")}
                        id="stealthprof"
                        name="stealthprof"
                        type="checkbox"
                      />
                    </li>
                    <li className="skills-li mb-2">
                      <Label className="ml-1 text-[10px]" htmlFor="survival">
                        Survival <span className="skill">(Wis)</span>
                      </Label>
                      <input
                        className="skills-total-input"
                        {...register("survival", { valueAsNumber: true })}
                        id="survival"
                        name="survival"
                        type="number"
                      />
                      <input
                        {...register("survivalexpertise")}
                        id="survivalexpertise"
                        name="survivalexpertise"
                        type="checkbox"
                      />
                      <input
                        {...register("survivalprof")}
                        id="survivalprof"
                        name="survivalprof"
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
                type="number"
                {...register("passiveperception", { valueAsNumber: true })}
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
                {...register("otherprofs")}
                className="h-[150px] w-[250px] rounded-sm border-2 border-black px-1"
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
                      {...register("ac", { valueAsNumber: true })}
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="ac"
                      name="ac"
                      placeholder="10"
                      type="number"
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
                      {...register("initiative", { valueAsNumber: true })}
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="initiative"
                      name="initiative"
                      placeholder="Dex"
                      type="number"
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
                      {...register("speed", { valueAsNumber: true })}
                      className="h-[60px] w-[80px] rounded-lg border-2 border-black text-center text-xl"
                      id="speed"
                      name="speed"
                      placeholder="30ft"
                      type="number"
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
                      {...register("maxhp", { valueAsNumber: true })}
                      className="ml-2 h-[15px] border-b-2 border-black/30 text-center text-xs text-black/70"
                      id="maxhp"
                      name="maxhp"
                      placeholder="10"
                      type="number"
                    />
                  </div>
                  <div className="current mx-2 flex flex-col-reverse items-center border-2 border-t-0 border-black">
                    <Label className="mb-1 mt-2 font-bold" htmlFor="currenthp">
                      Current Hit Points
                    </Label>
                    <input
                      {...register("currenthp", { valueAsNumber: true })}
                      placeholder="0"
                      className="h-[60px] w-5/6 text-center text-2xl"
                      id="currenthp"
                      name="currenthp"
                      type="number"
                    />
                  </div>
                </div>
                <div className="temporary mx-2 mt-1 flex flex-col-reverse items-center justify-center border-2 border-black">
                  <Label className="mb-1 mt-2 font-bold" htmlFor="temphp">
                    Temporary Hit Points
                  </Label>
                  <input
                    {...register("temphp", { valueAsNumber: true })}
                    placeholder="0"
                    className="mt-1 h-[60px] w-5/6 text-center text-2xl"
                    id="temphp"
                    name="temphp"
                    type="number"
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
                        {...register("totalhd")}
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
                        {...register("remaininghd", { valueAsNumber: true })}
                        className="h-[45px] w-[100px] text-center"
                        id="remaininghd"
                        name="remaininghd"
                        type="number"
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
                            {...register("deathsuccess1")}
                            id="deathsuccess1"
                            name="deathsuccess1"
                            type="checkbox"
                          />
                          <input
                            {...register("deathsuccess2")}
                            id="deathsuccess2"
                            name="deathsuccess2"
                            type="checkbox"
                          />
                          <input
                            {...register("deathsuccess3")}
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
                            {...register("deathfail1")}
                            id="deathfail1"
                            name="deathfail1"
                            type="checkbox"
                          />
                          <input
                            {...register("deathfail2")}
                            id="deathfail2"
                            name="deathfail2"
                            type="checkbox"
                          />
                          <input
                            {...register("deathfail3")}
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
                          {...register("atkname1")}
                          className="attacks-input"
                          id="atkname1"
                          name="atkname1"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkbonus1", { valueAsNumber: true })}
                          className="attacks-input"
                          id="atkbonus1"
                          name="atkbonus1"
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkdamage1")}
                          className="attacks-input"
                          id="atkdamage1"
                          name="atkdamage1"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          {...register("atkname2")}
                          className="attacks-input"
                          id="atkname2"
                          name="atkname2"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkbonus2", { valueAsNumber: true })}
                          className="attacks-input"
                          id="atkbonus2"
                          name="atkbonus2"
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkdamage2")}
                          className="attacks-input"
                          id="atkdamage2"
                          name="atkdamage2"
                          type="text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          {...register("atkname3")}
                          className="attacks-input"
                          id="atkname3"
                          name="atkname3"
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkbonus3", { valueAsNumber: true })}
                          className="attacks-input"
                          id="atkbonus3"
                          name="atkbonus3"
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          {...register("atkdamage3")}
                          className="attacks-input"
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
                        type="number"
                        {...register("cp", { valueAsNumber: true })}
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
                        type="number"
                        {...register("sp", { valueAsNumber: true })}
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
                        type="number"
                        {...register("ep", { valueAsNumber: true })}
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
                        type="number"
                        {...register("gp", { valueAsNumber: true })}
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
                        type="number"
                        {...register("pp", { valueAsNumber: true })}
                        placeholder="0"
                        className="coins-input"
                        id="pp"
                        name="pp"
                      />
                    </li>
                  </ul>
                </div>
                <textarea
                  {...register("equipmentlist")}
                  className="ml-3 px-1"
                  id="equipmentlist"
                  name="equipmentlist"
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
                  {...register("personality")}
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
                  {...register("ideals")}
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
                  {...register("bonds")}
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
                  {...register("flaws")}
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
                  {...register("features")}
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

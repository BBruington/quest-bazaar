import { Label } from "~/components/ui/label";

export default function Test() {
  return (
    <form className="charsheet w-[1000px] bg-white">
      {/* header with char name, basic class info */}
      <header className="flex">
        <section className="charname m-auto ml-1 flex w-1/3 flex-col-reverse rounded-md border-2 border-r-0 border-black bg-slate-400 p-2">
          <Label htmlFor="charname">Character Name</Label>
          <input className="px-1" name="charname" />
        </section>
        <section className="misc m-1 ml-0 w-2/3 rounded-md border-2 border-black px-1">
          <ul className="flex flex-wrap py-3">
            <li className="header-li">
              <Label className="mb-2" htmlFor="classNamelevel">
                Class
              </Label>
              <input
                className="header-input"
                name="classNamelevel"
                placeholder="Paladin"
              />
            </li>
            <li className="header-li">
              <Label className="mb-2" htmlFor="background">
                Background
              </Label>
              <input
                className="header-input"
                name="background"
                placeholder="Acolyte"
              />
            </li>
            <li className="header-li">
              <Label className="mb-2" htmlFor="playername">
                Player Name
              </Label>
              <input
                className="header-input"
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
                name="alignment"
                placeholder="Lawful Good"
              />
            </li>
            <li className="header-li">
              <Label className="mb-2" htmlFor="Level">
                Level
              </Label>
              <input className="header-input" name="Level" placeholder="1-20" />
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
                      name="Strengthscore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                      name="Dexterityscore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                      name="Constitutionscore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                      name="Wisdomscore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                      name="Intelligencescore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                      name="Charismascore"
                      placeholder="10"
                    />
                  </div>
                  <div className="modifier flex justify-center">
                    <input
                      className="ability-modifier-input"
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
                <input className="mr-3" name="inspiration" type="checkbox" />
              </div>
              <div className="proficiencybonus box flex flex-row-reverse">
                <div className="Label-container">
                  <Label className="text-[12px]" htmlFor="proficiencybonus">
                    Proficiency Bonus
                  </Label>
                </div>
                <input
                  className="w-8"
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
                      name="Strength-save"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Strength-save-prof" type="checkbox" />
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
                      name="Dexterity-save"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Dexterity-save-prof" type="checkbox" />
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
                      name="Constitution-save"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Constitution-save-prof" type="checkbox" />
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
                      name="Intelligence-save"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Intelligence-save-prof" type="checkbox" />
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
                      name="Charisma-save"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Charisma-save-prof" type="checkbox" />
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
                      name="Acrobatics"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Acrobatics-expertise" type="checkbox" />
                    <input name="Acrobatics-prof" type="checkbox" />
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
                      name="Animal Handling"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Animal Handling-expertise" type="checkbox" />
                    <input name="Animal Handling-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Arcana">
                      Arcana <span className="skill">(Int)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Arcana"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Arcana-expertise" type="checkbox" />
                    <input name="Arcana-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Athletics">
                      Athletics <span className="skill">(Str)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Athletics"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Athletics-expertise" type="checkbox" />
                    <input name="Athletics-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Deception">
                      Deception <span className="skill">(Cha)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Deception"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Deception-expertise" type="checkbox" />
                    <input name="Deception-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="History">
                      History <span className="skill">(Int)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="History"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="History-expertise" type="checkbox" />
                    <input name="History-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Insight">
                      Insight <span className="skill">(Wis)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Insight"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Insight-expertise" type="checkbox" />
                    <input name="Insight-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Intimidation">
                      Intimidation <span className="skill">(Cha)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Intimidation"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Intimidation-expertise" type="checkbox" />
                    <input name="Intimidation-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Investigation">
                      Investigation <span className="skill">(Int)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Investigation"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Investigation-expertise" type="checkbox" />
                    <input name="Investigation-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Medicine">
                      Medicine <span className="skill">(Wis)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Medicine"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Medicine-expertise" type="checkbox" />
                    <input name="Medicine-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Nature">
                      Nature <span className="skill">(Int)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Nature"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Nature-expertise" type="checkbox" />
                    <input name="Nature-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Perception">
                      Perception <span className="skill">(Wis)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Perception"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Perception-expertise" type="checkbox" />
                    <input name="Perception-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Performance">
                      Performance <span className="skill">(Cha)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Performance"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Performance-expertise" type="checkbox" />
                    <input name="Performance-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Persuation">
                      Persuation <span className="skill">(Cha)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Persuation"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Persuation-expertise" type="checkbox" />
                    <input name="Persuation-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Religion">
                      Religion <span className="skill">(Int)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Religion"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Religion-expertise" type="checkbox" />
                    <input name="Religion-prof" type="checkbox" />
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
                      name="Sleight of Hand"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Sleight of Hand-expertise" type="checkbox" />
                    <input name="Sleight of Hand-prof" type="checkbox" />
                  </li>
                  <li className="skills-li">
                    <Label className="ml-1 text-[10px]" htmlFor="Stealth">
                      Stealth <span className="skill">(Dex)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Stealth"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Stealth-expertise" type="checkbox" />
                    <input name="Stealth-prof" type="checkbox" />
                  </li>
                  <li className="skills-li mb-2">
                    <Label className="ml-1 text-[10px]" htmlFor="Survival">
                      Survival <span className="skill">(Wis)</span>
                    </Label>
                    <input
                      className="skills-total-input"
                      name="Survival"
                      placeholder="+0"
                      type="text"
                    />
                    <input name="Survival-expertise" type="checkbox" />
                    <input name="Survival-prof" type="checkbox" />
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
                  <Label className="py-1 text-xs text-black/70" htmlFor="maxhp">
                    Hit Point Maximum
                  </Label>
                  <input
                    className="ml-2 h-[15px] border-b-2 border-black/30 text-center text-xs text-black/70"
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
                        <input name="deathsuccess1" type="checkbox" />
                        <input name="deathsuccess2" type="checkbox" />
                        <input name="deathsuccess3" type="checkbox" />
                      </div>
                    </div>
                    <div className="deathfails flex items-center justify-between">
                      <Label className="text-xs">Failures</Label>
                      <div className="bubbles ml-2 flex space-x-1">
                        <input name="deathfail1" type="checkbox" />
                        <input name="deathfail2" type="checkbox" />
                        <input name="deathfail3" type="checkbox" />
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
              <Label className="my-1">Attacks & Spellcasting</Label>
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
                        name="atkname1"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkbonus1"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkdamage1"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkname2"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkbonus2"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkdamage2"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkname3"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
                        name="atkbonus3"
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        className="w-24 bg-black/10"
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
                    <Label
                      className="coins-label"
                      htmlFor="cp"
                    >
                      cp
                    </Label>
                    <input
                      placeholder="0"
                      className="coins-input"
                      name="cp"
                    />
                  </li>
                  <li className="flex items-center">
                    <Label
                      className="coins-label"
                      htmlFor="sp"
                    >
                      sp
                    </Label>
                    <input
                      placeholder="0"
                      className="coins-input"
                      name="sp"
                    />
                  </li>
                  <li className="flex items-center">
                    <Label
                      className="coins-label"
                      htmlFor="ep"
                    >
                      ep
                    </Label>
                    <input
                      placeholder="0"
                      className="coins-input"
                      name="ep"
                    />
                  </li>
                  <li className="flex items-center">
                    <Label
                      className="coins-label"
                      htmlFor="gp"
                    >
                      gp
                    </Label>
                    <input
                      placeholder="0"
                      className="coins-input"
                      name="gp"
                    />
                  </li>
                  <li className="flex items-center">
                    <Label
                      className="coins-label"
                      htmlFor="pp"
                    >
                      pp
                    </Label>
                    <input
                      placeholder="0"
                      className="coins-input"
                      name="pp"
                    />
                  </li>
                </ul>
              </div>
              <textarea
                className="ml-3"
                placeholder="Equipment list here"
              ></textarea>
            </div>
            <Label className="mb-1">Equipment</Label>
          </section>
        </section>

        {/* personalite, Ideals, Bonds, Flaws, features / traits */}
        <section className="w-1/3">

          {/* not traits */}
          <section className="flavor flex flex-col bg-slate-400 space-y-3 p-2 m-5 mt-0 rounded-lg">
            <div className="personality flex flex-col-reverse items-center border-black border-2 rounded-md">
              <Label className="personality-label" htmlFor="personality">Personality</Label>
              <textarea className="personality-textarea" name="personality"></textarea>
            </div>
            <div className="ideals flex flex-col-reverse items-center border-black border-2 rounded-md">
              <Label className="personality-label" htmlFor="ideals">Ideals</Label>
              <textarea className="personality-textarea" name="ideals"></textarea>
            </div>
            <div className="bonds flex flex-col-reverse items-center border-black border-2 rounded-md">
              <Label className="personality-label" htmlFor="bonds">Bonds</Label>
              <textarea className="personality-textarea" name="bonds"></textarea>
            </div>
            <div className="flaws flex flex-col-reverse items-center border-black border-2 rounded-md">
              <Label className="personality-label" htmlFor="flaws">Flaws</Label>
              <textarea className="personality-textarea" name="flaws"></textarea>
            </div>
          </section>
          <section className="features flex flex-col items-center m-5 border-black border-2 rounded-md">
            <div className="flex flex-col-reverse w-full">
              <Label className="bg-slate-100 text-center rounded-sm w-full p-[2px]" htmlFor="features">Features & Traits</Label>
              <textarea className="h-[302px] w-full p-2" name="features"></textarea>
            </div>
          </section>
        </section>
      </main>
    </form>
  );
}

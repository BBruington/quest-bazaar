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
              <input
                className="header-input"
                name="Level"
                placeholder="1-20"
              />
            </li>
          </ul>
        </section>
      </header>

      <main className="flex justify-between">
        {/* stats, saves, skills, and proficiencies */}
        <section className="flex w-1/3 flex-col items-start ml-1">
          {/* stats, saves, and skills */}
          <section className="attributes flex">
            {/* Base Stats */}
            <div className="scores flex w-[100px] flex-col rounded-md bg-slate-400 pb-2">
              <ul className="m-3 space-y-1 rounded-xl bg-slate-400 flex flex-col justify-between h-[730px]">
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
                    <Label className="ml-2 text-[11px] font-bold" htmlFor="Strength-save">
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
                    <Label className="ml-2 text-[11px] font-bold" htmlFor="Dexterity-save">
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
                    <Label className="ml-2 text-[11px] font-bold" htmlFor="Wisdom-save">
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
                    <Label className="ml-2 text-[11px] font-bold" htmlFor="Charisma-save">
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
          <div className="passive-perception box flex flex-row-reverse mt-2">
            <div className="Label-container flex items-center self-center border-l-0 border-black border-2 h-[21px] ">
              <Label className="text-black font-light p-1" htmlFor="passiveperception">
                Passive Perception (Wisdom)
              </Label>
            </div>
            <input name="passiveperception" placeholder="10" className="w-10 rounded-md text-center border-black border-2"/>
          </div>

          {/* other prof and languages */}
          <div className="otherprofs box textblock flex flex-col-reverse items-center mt-2">
            <Label className="text-xs border-2 border-t-0 border-black rounded-sm w-[220px] text-center" htmlFor="otherprofs">
              Other Proficiencies and Languages
            </Label>
            <textarea className="border-2 border-black rounded-sm w-[250px] h-[300px]" name="otherprofs"></textarea>
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
                  <Label className="text-xs bg-white w-[60px] text-center self-center border-black border-t-0 border-2 rounded-sm" htmlFor="ac">Armor Class</Label>
                  <input className="w-[80px] h-[80px] border-black border-2 rounded-lg text-center text-sm" name="ac" placeholder="10 + Armor" type="text" />
                </div>
              </div>
              <div className="initiative">
                <div className="flex flex-col-reverse">
                  <Label className="h-[25px] text-xs bg-white w-[60px] text-center self-center border-black border-t-0 border-2 rounded-sm" htmlFor="initiative">Initiative</Label>
                  <input
                  className="w-[80px] h-[80px] border-black border-2 rounded-lg text-center text-sm"
                    name="initiative"
                    placeholder="Dex + Misc"
                    type="text"
                  />
                </div>
              </div>
              <div className="speed">
                <div className="flex flex-col-reverse">
                  <Label className="h-[25px] text-xs bg-white w-[60px] text-center self-center border-black border-t-0 border-2 rounded-sm" htmlFor="speed">Speed</Label>
                  <input className="w-[80px] h-[80px] border-black border-2 rounded-lg text-center text-sm" name="speed" placeholder="30" type="text" />
                </div>
              </div>
            </div>

            {/* hp */}
            <div className="hp flex flex-col">
              <div className="regular">
                <div className="max">
                  <Label htmlFor="maxhp">Hit Point Maximum</Label>
                  <input name="maxhp" placeholder="10" type="text" />
                </div>
                <div className="current">
                  <Label htmlFor="currenthp">Current Hit Points</Label>
                  <input name="currenthp" type="text" />
                </div>
              </div>
              <div className="temporary">
                <Label htmlFor="temphp">Temporary Hit Points</Label>
                <input name="temphp" type="text" />
              </div>
            </div>

            {/* hit dice / death saves */}
            <div className="flex">
              <div className="hitdice">
                <div>
                  <div className="total">
                    <Label htmlFor="totalhd">Total</Label>
                    <input name="totalhd" placeholder="2d10" type="text" />
                  </div>
                  <div className="remaining">
                    <Label htmlFor="remaininghd">Hit Dice</Label>
                    <input name="remaininghd" type="text" />
                  </div>
                </div>
              </div>
              <div className="deathsaves">
                <div>
                  <div className="Label">
                    <Label>Death Saves</Label>
                  </div>
                  <div className="marks">
                    <div className="deathsuccesses">
                      <Label>Successes</Label>
                      <div className="bubbles">
                        <input name="deathsuccess1" type="checkbox" />
                        <input name="deathsuccess2" type="checkbox" />
                        <input name="deathsuccess3" type="checkbox" />
                      </div>
                    </div>
                    <div className="deathfails">
                      <Label>Failures</Label>
                      <div className="bubbles">
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
          <section className="attacksandspellcasting">
            <div>
              <Label>Attacks & Spellcasting</Label>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Atk Bonus</th>
                    <th>Damage/Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input name="atkname1" type="text" />
                    </td>
                    <td>
                      <input name="atkbonus1" type="text" />
                    </td>
                    <td>
                      <input name="atkdamage1" type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input name="atkname2" type="text" />
                    </td>
                    <td>
                      <input name="atkbonus2" type="text" />
                    </td>
                    <td>
                      <input name="atkdamage2" type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input name="atkname3" type="text" />
                    </td>
                    <td>
                      <input name="atkbonus3" type="text" />
                    </td>
                    <td>
                      <input name="atkdamage3" type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <textarea></textarea>
            </div>
          </section>

          {/* equipment */}
          <section className="equipment">
            <div className="flex">
              <div className="money">
                <ul>
                  <li>
                    <Label htmlFor="cp">cp</Label>
                    <input name="cp" />
                  </li>
                  <li>
                    <Label htmlFor="sp">sp</Label>
                    <input name="sp" />
                  </li>
                  <li>
                    <Label htmlFor="ep">ep</Label>
                    <input name="ep" />
                  </li>
                  <li>
                    <Label htmlFor="gp">gp</Label>
                    <input name="gp" />
                  </li>
                  <li>
                    <Label htmlFor="pp">pp</Label>
                    <input name="pp" />
                  </li>
                </ul>
              </div>
              <textarea placeholder="Equipment list here"></textarea>
            </div>
            <Label>Equipment</Label>
          </section>
        </section>

        {/* personalite, Ideals, Bonds, Flaws, features / traits */}
        <section className="w-1/3">
          <section className="flavor">
            <div className="personality flex flex-col">
              <Label htmlFor="personality">Personality</Label>
              <textarea name="personality"></textarea>
            </div>
            <div className="ideals flex flex-col">
              <Label htmlFor="ideals">Ideals</Label>
              <textarea name="ideals"></textarea>
            </div>
            <div className="bonds flex flex-col">
              <Label htmlFor="bonds">Bonds</Label>
              <textarea name="bonds"></textarea>
            </div>
            <div className="flaws flex flex-col">
              <Label htmlFor="flaws">Flaws</Label>
              <textarea name="flaws"></textarea>
            </div>
          </section>
          <section className="features">
            <div className="flex flex-col">
              <Label htmlFor="features">Features & Traits</Label>
              <textarea name="features"></textarea>
            </div>
          </section>
        </section>
      </main>
    </form>
  );
}

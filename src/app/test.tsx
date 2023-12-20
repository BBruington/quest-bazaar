import { Label } from "~/components/ui/label";

export default function Test() {
  return (
    <form className="charsheet">
    <header>
      <section className="charname">
        <Label htmlFor="charname">Character Name</Label>
        <input name="charname" />
      </section>
      <section className="misc">
        <ul>
          <li>
            <Label htmlFor="classNamelevel">className & Level</Label><input name="classNamelevel" placeholder="Paladin 2" />
          </li>
          <li>
            <Label htmlFor="background">Background</Label><input name="background" placeholder="Acolyte" />
          </li>
          <li>
            <Label htmlFor="playername">Player Name</Label><input name="playername" placeholder="Player McPlayerface"></input>
          </li>
          <li>
            <Label htmlFor="race">Race</Label><input name="race" placeholder="Half-elf" />
          </li>
          <li>
            <Label htmlFor="alignment">Alignment</Label><input name="alignment" placeholder="Lawful Good" />
          </li>
          <li>
            <Label htmlFor="experiencepoints">Experience Points</Label><input name="experiencepoints" placeholder="3240" />
          </li>
        </ul>
      </section>
    </header>
    <main>
      <section>
        <section className="attributes">
          <div className="scores">
            <ul>
              <li>
                <div className="score">
                  <Label htmlFor="Strengthscore">Strength</Label><input name="Strengthscore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Strengthmod" placeholder="+0" />
                </div>
              </li>
              <li>
                <div className="score">
                  <Label htmlFor="Dexterityscore">Dexterity</Label><input name="Dexterityscore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Dexteritymod" placeholder="+0" />
                </div>
              </li>
              <li>
                <div className="score">
                  <Label htmlFor="Constitutionscore">Constitution</Label><input name="Constitutionscore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Constitutionmod" placeholder="+0" />
                </div>
              </li>
              <li>
                <div className="score">
                  <Label htmlFor="Wisdomscore">Wisdom</Label><input name="Wisdomscore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Wisdommod" placeholder="+0" />
                </div>
              </li>
              <li>
                <div className="score">
                  <Label htmlFor="Intelligencescore">Intelligence</Label><input name="Intelligencescore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Intelligencemod" placeholder="+0" />
                </div>
              </li>
              <li>
                <div className="score">
                  <Label htmlFor="Charismascore">Charisma</Label><input name="Charismascore" placeholder="10" />
                </div>
                <div className="modifier">
                  <input name="Charismamod" placeholder="+0" />
                </div>
              </li>
            </ul>
          </div>
          <div className="attr-applications">
            <div className="inspiration box">
              <div className="Label-container">
                <Label htmlFor="inspiration">Inspiration</Label>
              </div>
              <input name="inspiration" type="checkbox" />
            </div>
            <div className="proficiencybonus box">
              <div className="Label-container">
                <Label htmlFor="proficiencybonus">Proficiency Bonus</Label>
              </div>
              <input name="proficiencybonus" placeholder="+2" />
            </div>
            <div className="saves list-section box">
              <ul>
                <li>
                  <Label htmlFor="Strength-save">Strength</Label><input name="Strength-save" placeholder="+0" type="text" /><input name="Strength-save-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Dexterity-save">Dexterity</Label><input name="Dexterity-save" placeholder="+0" type="text" /><input name="Dexterity-save-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Constitution-save">Constitution</Label><input name="Constitution-save" placeholder="+0" type="text" /><input name="Constitution-save-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Wisdom-save">Wisdom</Label><input name="Wisdom-save" placeholder="+0" type="text" /><input name="Wisdom-save-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Intelligence-save">Intelligence</Label><input name="Intelligence-save" placeholder="+0" type="text" /><input name="Intelligence-save-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Charisma-save">Charisma</Label><input name="Charisma-save" placeholder="+0" type="text" /><input name="Charisma-save-prof" type="checkbox" />
                </li>
              </ul>
              <div className="Label">
                Saving Throws
              </div>
            </div>
            <div className="skills list-section box">
              <ul>
                <li>
                  <Label htmlFor="Acrobatics">Acrobatics <span className="skill">(Dex)</span></Label><input name="Acrobatics" placeholder="+0" type="text" /><input name="Acrobatics-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Animal Handling">Animal Handling <span className="skill">(Wis)</span></Label><input name="Animal Handling" placeholder="+0" type="text" /><input name="Animal Handling-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Arcana">Arcana <span className="skill">(Int)</span></Label><input name="Arcana" placeholder="+0" type="text" /><input name="Arcana-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Athletics">Athletics <span className="skill">(Str)</span></Label><input name="Athletics" placeholder="+0" type="text" /><input name="Athletics-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Deception">Deception <span className="skill">(Cha)</span></Label><input name="Deception" placeholder="+0" type="text" /><input name="Deception-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="History">History <span className="skill">(Int)</span></Label><input name="History" placeholder="+0" type="text" /><input name="History-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Insight">Insight <span className="skill">(Wis)</span></Label><input name="Insight" placeholder="+0" type="text" /><input name="Insight-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Intimidation">Intimidation <span className="skill">(Cha)</span></Label><input name="Intimidation" placeholder="+0" type="text" /><input name="Intimidation-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Investigation">Investigation <span className="skill">(Int)</span></Label><input name="Investigation" placeholder="+0" type="text" /><input name="Investigation-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Medicine">Medicine <span className="skill">(Wis)</span></Label><input name="Medicine" placeholder="+0" type="text" /><input name="Medicine-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Nature">Nature <span className="skill">(Int)</span></Label><input name="Nature" placeholder="+0" type="text" /><input name="Nature-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Perception">Perception <span className="skill">(Wis)</span></Label><input name="Perception" placeholder="+0" type="text" /><input name="Perception-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="PerhtmlFormance">PerhtmlFormance <span className="skill">(Cha)</span></Label><input name="PerhtmlFormance" placeholder="+0" type="text" /><input name="PerhtmlFormance-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Persuasion">Persuasion <span className="skill">(Cha)</span></Label><input name="Persuasion" placeholder="+0" type="text" /><input name="Persuasion-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Religion">Religion <span className="skill">(Int)</span></Label><input name="Religion" placeholder="+0" type="text" /><input name="Religion-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Sleight of Hand">Sleight of Hand <span className="skill">(Dex)</span></Label><input name="Sleight of Hand" placeholder="+0" type="text" /><input name="Sleight of Hand-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Stealth">Stealth <span className="skill">(Dex)</span></Label><input name="Stealth" placeholder="+0" type="text" /><input name="Stealth-prof" type="checkbox" />
                </li>
                <li>
                  <Label htmlFor="Survival">Survival <span className="skill">(Wis)</span></Label><input name="Survival" placeholder="+0" type="text" /><input name="Survival-prof" type="checkbox" />
                </li>
              </ul>
              <div className="Label">
                Skills
              </div>
            </div>
          </div>
        </section>
        <div className="passive-perception box">
          <div className="Label-container">
            <Label htmlFor="passiveperception">Passive Wisdom (Perception)</Label>
          </div>
          <input name="passiveperception" placeholder="10" />
        </div>
        <div className="otherprofs box textblock">
          <Label htmlFor="otherprofs">Other Proficiencies and Languages</Label><textarea name="otherprofs"></textarea>
        </div>
      </section>
      <section>
        <section className="combat">
          <div className="armorclassName">
            <div>
              <Label htmlFor="ac">Armor className</Label><input name="ac" placeholder="10" type="text" />
            </div>
          </div>
          <div className="initiative">
            <div>
              <Label htmlFor="initiative">Initiative</Label><input name="initiative" placeholder="+0" type="text" />
            </div>
          </div>
          <div className="speed">
            <div>
              <Label htmlFor="speed">Speed</Label><input name="speed" placeholder="30" type="text" />
            </div>
          </div>
          <div className="hp">
            <div className="regular">
              <div className="max">
                <Label htmlFor="maxhp">Hit Point Maximum</Label><input name="maxhp" placeholder="10" type="text" />
              </div>
              <div className="current">
                <Label htmlFor="currenthp">Current Hit Points</Label><input name="currenthp" type="text" />
              </div>
            </div>
            <div className="temporary">
              <Label htmlFor="temphp">Temporary Hit Points</Label><input name="temphp" type="text" />
            </div>
          </div>
          <div className="hitdice">
            <div>
              <div className="total">
                <Label htmlFor="totalhd">Total</Label><input name="totalhd" placeholder="2d10" type="text" />
              </div>
              <div className="remaining">
                <Label htmlFor="remaininghd">Hit Dice</Label><input name="remaininghd" type="text" />
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
        </section>
        <section className="attacksandspellcasting">
          <div>
            <Label>Attacks & Spellcasting</Label>
            <table>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Atk Bonus
                  </th>
                  <th>
                    Damage/Type
                  </th>
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
        <section className="equipment">
          <div>
            <Label>Equipment</Label>
            <div className="money">
              <ul>
                <li>
                  <Label htmlFor="cp">cp</Label><input name="cp" />
                </li>
                <li>
                  <Label htmlFor="sp">sp</Label><input name="sp" />
                </li>
                <li>
                  <Label htmlFor="ep">ep</Label><input name="ep" />
                </li>
                <li>
                  <Label htmlFor="gp">gp</Label><input name="gp" />
                </li>
                <li>
                  <Label htmlFor="pp">pp</Label><input name="pp" />
                </li>
              </ul>
            </div>
            <textarea placeholder="Equipment list here"></textarea>
          </div>
        </section>
      </section>
      <section>
        <section className="flavor">
          <div className="personality">
            <Label htmlFor="personality">Personality</Label><textarea name="personality"></textarea>
          </div>
          <div className="ideals">
            <Label htmlFor="ideals">Ideals</Label><textarea name="ideals"></textarea>
          </div>
          <div className="bonds">
            <Label htmlFor="bonds">Bonds</Label><textarea name="bonds"></textarea>
          </div>
          <div className="flaws">
            <Label htmlFor="flaws">Flaws</Label><textarea name="flaws"></textarea>
          </div>
        </section>
        <section className="features">
          <div>
            <Label htmlFor="features">Features & Traits</Label><textarea name="features"></textarea>
          </div>
        </section>
      </section>
    </main>
  </form>
  )
}

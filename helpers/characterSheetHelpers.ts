
export const blankCharacterSheetInfo = {
  id: 0,                 
  name: "",
  race: "",               
  class: "",
  level: 1,              
  background: "",         
  alignment: "neutral",          
  experiencePoints: 0,   
  maxHitPoints:0,       
  currentHitPoints:0,
  tempHitPoints:0,      
  armorClass:0, 
  initiative:0,         
  speed :30,             
  inspiration:false,        
  proficiencyBonus:2,
  personalityTraits:"",  
  ideals:"",            
  bonds:"",              
  flaws:"",             
  features:"",          
  languages:"",
  abilityScores:{
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  }, 
  modifiers:{
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  }, 
  trained: [],
  expertise: [],
  skills:{
    athletics: 0,
    acrobatics: 0,
    sleightOfHand: 0,
    stealth: 0,
    arcana: 0,
    history: 0,
    investigation: 0,
    nature: 0,
    religion: 0,
    animalHandling: 0,
    insight: 0,
    medicine: 0,
    perception: 0,
    survival: 0,
    deception: 0,
    intimidation: 0,
    performance: 0,
    persuasion: 0,
  },          
  savingThrows:{
    strength:0,
    dexterity:0,
    constitution:0,
    intelligence:0,
    wisdom:0,
    charisma:0
  },     
  abilities:{},         
  spells:{},        
  equipment:{},        
  userId:0,         
  user:"",
} as const

type AbilityScore = typeof  blankCharacterSheetInfo[keyof typeof blankCharacterSheetInfo]

// export const handleAbilityScoreMod = (abiMod: AbilityScore):number => {
//   return Math.floor(blankCharacterSheetInfo.abilityScores[abiMod] - 10 / 2)
// }
export const handleSkillMod = (abiMod: number, prof: number, misc = 0, edge = false): number => {
  return abiMod + prof + misc
}

// enum AbilityScore {
//   Strength = "strength",
//   Dexterity = "dexterity",
//   Constitution = "constitution",
//   Intelligence = "intelligence",
//   Wisdom = "wisdom",
//   Charisma = "charisma"
// }
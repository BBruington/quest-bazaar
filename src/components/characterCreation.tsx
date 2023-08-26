import { useState } from "react"

export default function CharacterCreation() {

  const [character, setCharacter] = useState({
      id: 0,                 
      name: "",               
      race: "",               
      class: "",              
      level: 1,              
      background: "",         
      alignment: "neutral",          
      experiencePoints: 0,   
      maxHitPoints: 0,       
      currentHitPoints:0,
      tempHitPoints:0,      
      armorClass:0,         
      initiative:0,         
      speed :30,             
      inspiration:true,        
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
      savingThrows:{},     
      abilities:{},         
      spells:{},        
      equipment:{},        
      userId:0,         
      user:"",
  })

  return (
    <>
    
    </>
  )
}
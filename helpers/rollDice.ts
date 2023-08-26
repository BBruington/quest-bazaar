const makeARoll = (die: number) => {
  return Math.floor(Math.random()*(die - 1)) + 1;
}

export const rollDice = ( numDice: number, dieType: number, bonus = 0) => {
  const results = { total: 0, rolls: [] as number[] };
  for (let i = 1; i < numDice + 1; i++) {
    const result = makeARoll(dieType);
    results.total += result;
    results.rolls.push(result);
  }
  results.total += bonus;
  console.log(results)
  return results;
}
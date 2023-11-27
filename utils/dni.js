const dniLetterEquivalences = {
  0: "T",
  1: "R",
  2: "W",
  3: "A",
  4: "G",
  5: "M",
  6: "Y",
  7: "F",
  8: "P",
  9: "D",
  10: "X",
  11: "B",
  12: "N",
  13: "J",
  14: "Z",
  15: "S",
  16: "Q",
  17: "V",
  18: "H",
  19: "L",
  20: "C",
  21: "K",
  22: "E"
}


/**
 * 
 * @returns 
 * You should ONLY use your own DNI.
 * This function is only for testing purposes. 
 * Any illegal use is strongly discouraged and I assume no responsibility for any missuse.
 */
export function randomDNIGenerator() {
  const randomNumber = Math.floor(Math.random() * 99999999);
  const comparationNumber = Math.trunc(randomNumber / 23) * 23; 
  const numberForCheckingTables = randomNumber - comparationNumber;
  return randomNumber + '' + dniLetterEquivalences[numberForCheckingTables];
}
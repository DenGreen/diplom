import {
  Swordsman,
  Bowman,
  Magician,
  Daemon,
  Undead,
  Vampire,
} from "./cpecialCharacter";

import Team from "./Team";

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
const teamComp = new Team();
const teamPlayer = new Team();

export function* characterGenerator() {
  const column = searchColumn();
  yield generateTeam(
    [
      [Swordsman, Bowman],
      [Daemon, Undead, Vampire],
    ],
    1,
    column,
    2
  );
  yield generateTeam(
    [
      [Swordsman, Bowman, Magician],
      [Daemon, Undead, Vampire],
    ],
    2,
    column,
    1
  );
  yield generateTeam(
    [
      [Swordsman, Bowman, Magician],
      [Daemon, Undead, Vampire],
    ],
    3,
    column,
    2
  );
  return generateTeam(
    [
      [Swordsman, Bowman, Magician],
      [Daemon, Undead, Vampire],
    ],
    4,
    column,
    2
  );
}

function searchColumn() {
  let element = document.getElementsByClassName("cell");
  let arrElement = Array.from(element);
  let max = 8;
  let arrColumnPlayer = [];
  let arrColumnComputer = [];

  for (let i = 0; i <= max - 1; i += 1) {
    arrColumnPlayer.push(arrElement[0 + i * max]);
    arrColumnPlayer.push(arrElement[1 + i * max]);
    arrColumnComputer.push(arrElement[6 + i * max]);
    arrColumnComputer.push(arrElement[7 + i * max]);
  }

  return [arrColumnPlayer, arrColumnComputer];
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export function generateTeam(allowedTypes, maxLevel, column, characterCount) {
  let columnPlayer = [];
  let columnComp = [];
  let charPlayer = [];
  let charComp = [];

  for (let i = 0; i <= characterCount - 1; i += 1) {
    console.log(characterCount)
    let charClassPlayer = allowedTypes[0][getRandom(allowedTypes[0].length)];
    let charClassComp = allowedTypes[1][getRandom(allowedTypes[1].length)];
    let charPlayerNew = new charClassPlayer(maxLevel);
    let charCompNew = new charClassComp(getRandom(maxLevel + 1));

    charPlayer.push(charPlayerNew.type);
    charComp.push(charCompNew.type);

    columnPlayer.push(column[0][getRandom(8 + 8)]);
    columnComp.push(column[1][getRandom(8 + 8)]);
    

    teamComp.arrTeam(charPlayerNew);
    teamPlayer.arrTeam(charCompNew);
    console.log(teamPlayer, teamComp)
  }

  return [[columnPlayer, charPlayer], [columnComp, charComp]];
}

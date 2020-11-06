import {
  Swordsman,
  Bowman,
  Magician,
  Daemon,
  Undead,
  Vampire,
} from "./cpecialCharacter";

import Team from './Team';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator() {
  const arrCharacter = [
    [new Swordsman(1, "swordsman"), new Bowman(1, "bowman"), new Magician(1, "magician")],
    [new Daemon(1, "daemon"), new Undead(1, "undead"), new Vampire(1, "vampire")],
  ];
  const column = searchColumn();
  yield visualis(
    arrCharacter,
    column,
    2
  );
  yield visualis(
    arrCharacter,
    column,
    1
  );
  yield visualis(
    arrCharacter,
    column,
    2
  );
  yield visualis(
    arrCharacter,
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

function visualis(char, column, maxCharacter) {
  for (let i = 0; i <= maxCharacter - 1; i += 1) {
    column[0][getRandom(8 + 8)].innerHTML = `
    <div class="character ${char[0][getRandom(2)].type}"></div>`;
    column[1][getRandom(8 + 8)].innerHTML = `
    <div class="character ${char[1][getRandom(2)].type}"></div>`;
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
}

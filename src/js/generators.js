import PositionedCharacter from './PositionedCharacter';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel) {
  for(let i = 0; i< allowedTypes.length; i += 1){
    const level = Math.floor(Math.random() * (Math.floor(maxLevel) - Math.ceil(1) + 1)) + Math.ceil(1);

    yield new allowedTypes[i](level);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount, team) {
  const result = [];
  const generator = characterGenerator(allowedTypes, maxLevel);
  const arrPosition = generatePosition(team);

  for(let i = 0; i < characterCount; i += 1){
    const character = generator.next();
    const random = arrPosition[getRandom(16)];
    result.push(new PositionedCharacter(character.value, random));
  }

  return result;
}

function generatePosition(team) {
  const valueOne = team === 'Player' ? 0 : 6;
  const arrPosition = [];

  for (let i = 0; i <= 8 - 1; i += 1) {
    arrPosition.push(valueOne + i * 8);
    arrPosition.push((valueOne + 1) + i * 8);
  }

  return arrPosition;
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

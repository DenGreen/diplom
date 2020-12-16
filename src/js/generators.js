import PositionedCharacter from './PositionedCharacter';
import {playerTeam, compTeam} from './Team';

export function* characterGenerator(allowedTypes, maxLevel) {
  for(let i = 0; i < allowedTypes.length; i += 1){
    const level = Math.floor(Math.random() * (Math.floor(maxLevel) - Math.ceil(1) + 1)) + Math.ceil(1);

    yield new allowedTypes[i](level);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount, team) {
  shuffle(allowedTypes);
  const generator = characterGenerator(allowedTypes, maxLevel);

  const arrPosition = generatePosition(team);

  for(let i = 0; i < characterCount; i += 1){
    const character = generator.next();
    const random = arrPosition[getRandom(16)];
    if(!character.done) {
      if(team === 'Player') {
        playerTeam.team.push(new PositionedCharacter(character.value, random));
      } else {
        compTeam.team.push(new PositionedCharacter(character.value, random));
      }
    }
  }

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

function shuffle(arr){
  let j = null;
  let temp = null;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

 let arr = ['bowman', 'daemon', 'swordsman', 'magician', 'undead', 'vampire']

export function* characterGenerator(allowedTypes, maxLevel = 1) {
  let element = document.getElementsByClassName('cell');
  let arrElement = Array.from(element);
  let max = 8;
  let arrColumnPlayer = [];
  let arrColumnComputer = [];

  let maxCharacter = 1;

  for(let i = 0; i <= max - 1; i += 1){
    arrColumnPlayer.push(arrElement[0 + i  * max]);
    arrColumnPlayer.push(arrElement[1 + i  * max]);
    arrColumnComputer.push(arrElement[6 + i  * max]);
    arrColumnComputer.push(arrElement[7 + i  * max]);
  }

  for(let i = 0; i <= maxCharacter - 1; i += 1){
    arrColumnPlayer[getRandom(max + max)].innerHTML = `
    <div class="character ${arr[getRandom(6)]}"></div>`;
    arrColumnComputer[getRandom(max + max)].innerHTML = `
    <div class="character ${arr[getRandom(6)]}"></div>`;
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

characterGenerator(arr, maxLevel = 1)

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
}

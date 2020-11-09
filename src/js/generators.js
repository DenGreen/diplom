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

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const result = [];
  const generator = characterGenerator(allowedTypes, maxLevel);

  for(let i = 0; i < characterCount; i += 1){
    const character = generator.next();
    result.push(character.value);
  }
  
  return result;
}

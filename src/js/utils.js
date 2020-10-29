export function calcTileType(index, boardSize) {
  switch(index) {
    case (0):
      return 'top-left';
    case (boardSize - 1):
      return 'top-right';
    case (boardSize ** 2 - 1):
      return 'bottom-right';
    case ((boardSize ** 2) - boardSize):
      return 'bottom-left';
  }

  for(let i = 1; i <= boardSize - 1; i += 1){
    if (i === index) return 'top';
  }

  for(let i = boardSize; i <= boardSize * (boardSize - 2); i += boardSize){
    if(i === index) return 'left'
  }

  for(let i = boardSize + boardSize - 1; i <= boardSize * (boardSize - 2) + boardSize; i += boardSize){
    if(i === index) return 'right';
  }

  for(let i = boardSize ** 2 - 2; i >= boardSize ** 2 - boardSize; i -= 1){
    if(i === index) return 'bottom';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

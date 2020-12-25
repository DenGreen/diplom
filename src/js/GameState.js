class GameState {
  constructor(){
    this.motion = 'Player'; /** Свойство хронящее очередь хода */
    this.points = 0;
  }


  /**Метод переключает очередь хода */
  changingMotion() {
    this.motion = this.motion === 'Player' ? 'Comp' : 'Player';
  }
/* static from(object) {
    // TODO: create object
    return null;
  } */
}

export const gameState = new GameState();

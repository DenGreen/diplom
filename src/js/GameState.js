export default class GameState {
  constructor(){
    this.motion = 'Player'; /** Свойство хронящее очередь хода */
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

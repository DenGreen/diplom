import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    const onCellEnterBind = this.onCellEnter.bind(this);
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.addCellEnterListener(onCellEnterBind);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index){
    this.gamePlay.showCellTooltip('', index);
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}

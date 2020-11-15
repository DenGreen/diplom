import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    const onCellEnterBind = this.onCellEnter.bind(this);
    const onCellLeaveBind = this.onCellLeave.bind(this);
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.addCellEnterListener(onCellEnterBind);
    this.gamePlay.addCellLeaveListener(onCellLeaveBind);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index){
    let char = this.gamePlay.cells[index].querySelector('.character');
    if(char){
      this.gamePlay.showCellTooltip('', index);
      char.append(tmpl.content.cloneNode(true));
    }
  }

  onCellLeave(index) {
    let inf = this.gamePlay.cells[index].querySelector('.inf');
    if(inf){
      this.gamePlay.hideCellTooltip(index);
      inf.replaceWith('');
    }
  }
}

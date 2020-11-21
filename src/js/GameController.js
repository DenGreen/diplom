import themes from "./themes";

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

  onCellEnter(index) {
    if (this.gamePlay.cells[index].querySelector(".character")) {
      let pers = null;
      
      this.gamePlay.arrChar.forEach((element) => {
        if (element.position === index) {
          pers = element.character;
        }
      });

      this.gamePlay.showCellTooltip(
        `🎖${pers.level} ⚔${pers.attack} 🛡${pers.defence} ❤${pers.health}`,
        index
      );
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
}

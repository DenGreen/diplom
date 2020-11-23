import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.indexSelect = null;
  }

  init() {
    const onCellEnterBind = this.onCellEnter.bind(this);
    const onCellLeaveBind = this.onCellLeave.bind(this);
    const onCellClickBind = this.onCellClick.bind(this);
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.addCellEnterListener(onCellEnterBind);
    this.gamePlay.addCellLeaveListener(onCellLeaveBind);
    this.gamePlay.addCellClickListener(onCellClickBind);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const char = this.gamePlay.cells[index].querySelector(".character");
    if(char.classList.contains('bowman') || char.classList.contains('swordsman') || char.classList.contains('magician')){
      if (this.indexSelect !== null) this.gamePlay.deselectCell(this.indexSelect);
      this.indexSelect = index;
      this.gamePlay.selectCell(index);
    } else {
      this.gamePlay.showError('Нельзя выбрать персонажей противника');
    }
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

import themes from "./themes";
import { playerTeam, compTeam } from "./Team";
import { gameState } from "./GameState";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.indexSelect = null; /** хранится выбранный персонаж */
    this.arrRadius = null;
    this.indexTornSelect = null;
  }

  init() {
    const onCellEnterBind = this.onCellEnter.bind(this);
    const onCellLeaveBind = this.onCellLeave.bind(this);
    const onCellClickBind = this.onCellClick.bind(this);
    const onTurnEnterBind = this.onTurnEnter.bind(this);
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.addCellEnterListener(onTurnEnterBind);
    this.gamePlay.addCellEnterListener(onCellEnterBind);
    this.gamePlay.addCellLeaveListener(onCellLeaveBind);
    this.gamePlay.addCellClickListener(onCellClickBind);

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
      const char = this.gamePlay.cells[index].querySelector(".character");

      try {
        if (
          char.classList.contains("bowman") ||
          char.classList.contains("swordsman") ||
          char.classList.contains("magician")
        ) { /** эту часть кода вынести в функцию */
          if (this.indexSelect !== null)
            this.gamePlay.deselectCell(this.indexSelect);

          this.arrRadius = this.gamePlay.radiusTurn(
            index
          ); /** Тут хранятся все ячейки на которые может пойти персонаж */

          this.gamePlay.setCursor("pointer");

          this.indexSelect = index;
          this.gamePlay.selectCell(index);
        } else {
          this.attackPers(index, gameState.motion);
          /** тут будет вызов функции которая передаст управление компьютеру, и рандомно выберет персанажа для атаки или хода */
        }
      } catch (err) {
        /** Если в ячейке нет персонажа, то делаем ход */

        let pers = this.searchPers(this.indexSelect, gameState.motion);
        pers.position = index;
        this.gamePlay.deselectCell(this.indexSelect);
        this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);

        /** тут будет вызов функции которая передаст управление компьютеру, и рандомно выберет персанажа для атаки или хода */

        /*for(let i = 0; i < playerTeam.team.length; i += 1){
        if(playerTeam.team[i].position === this.indexSelect){
          playerTeam.team[i].position = index;
          this.gamePlay.deselectCell(this.indexSelect);
          this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);
        }
      }*/
      }
  }

  /** Атака зависит от очереди хода */
  async attackPers(index, gameState) {
    let state = gameState === "Comp" ? 'Player' : "Comp";
    let persAttacker = this.searchPers(this.indexSelect, gameState);
    let persDefence = this.searchPers(index, state);

    let damage = Math.max(
      persAttacker.character.attack - persDefence.character.defence,
      persAttacker.character.attack * 0.1
    );

    await this.gamePlay.showDamage(index, damage);

    persDefence.character.health -= damage;
    this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);
  }

  /**Поиск персонажа по индексу его позиции */
  searchPers(index, gameState) {
    if (gameState === "Player") {
      for (let i = 0; i < playerTeam.team.length; i += 1) {
        if (playerTeam.team[i].position === index) {
          return playerTeam.team[i];
        }
      }
    } else {
      for (let i = 0; i < compTeam.team.length; i += 1) {
        if (compTeam.team[i].position === index) {
          return compTeam.team[i];
        }
      }
    }
  }

  onCellEnter(index) {
    const char = this.gamePlay.cells[index].querySelector(".character");
    if (char) {
      let pers = null;

      if (
        char.classList.contains("bowman") ||
        char.classList.contains("swordsman") ||
        char.classList.contains("magician")
      ) {
        this.gamePlay.setCursor("pointer");
      }

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

  /** Метод использует окружение выбранного персонажа, для отрисовки разрешенных ходов */

  onTurnEnter(index) {
    if (this.arrRadius !== null) {
      for (let arr of this.arrRadius) {
        if (arr === index) {
          const charComp = this.gamePlay.cells[index].querySelector(
            ".character"
          );
          this.gamePlay.setCursor("pointer");
          this.gamePlay.selectCell(index, "green");
          this.indexTornSelect = index;

          if (charComp) {
            if (
              charComp.classList.contains("daemon") ||
              charComp.classList.contains("undead") ||
              charComp.classList.contains("vampire")
            ) {
              this.gamePlay.selectCell(index, "red");
              this.gamePlay.setCursor("crosshair");
            }
          }
        }
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.setCursor("auto");
    this.gamePlay.hideCellTooltip(index);
    if (this.indexTornSelect !== null)
      this.gamePlay.deselectTurn(this.indexTornSelect);
  }
}

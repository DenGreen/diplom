import themes from "./themes";
import { playerTeam, compTeam } from "./Team";
import { gameState } from "./GameState";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.indexSelect = null; /** хранится выбранный персонаж */
    this.indexSelectComp = null;
    this.arrRadius = null;
    this.arrRadiusComp = null;
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

  async onCellClick(index) {
    const char = this.gamePlay.cells[index].querySelector(".character");

    if (!char) {
      let pers = this.searchPers(this.indexSelect, gameState.motion);
      pers.position = index;
      this.gamePlay.deselectCell(this.indexSelect);
      this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);

      gameState.changingMotion();
      this.computerMove();
    } else if (
      char.classList.contains("bowman") ||
      char.classList.contains("swordsman") ||
      char.classList.contains("magician")
    ) {
      /** эту часть кода вынести в функцию */
      if (this.indexSelect !== null)
        this.gamePlay.deselectCell(this.indexSelect);

      this.arrRadius = this.gamePlay.radiusTurn(
        index
      ); /** Тут хранятся все ячейки на которые может пойти персонаж */

      this.gamePlay.setCursor("pointer");

      this.indexSelect = index;
      this.gamePlay.selectCell(index);
    } else {
      await this.attackPers(index, gameState.motion);
      gameState.changingMotion();
      this.computerMove();
      /** тут будет вызов функции которая передаст управление компьютеру, и рандомно выберет персанажа для атаки или хода */
    }
  }

  /** Атака зависит от очереди хода */
  async attackPers(index, gameState) {
    let state = null;
    let persAttacker = null;

    if (gameState === "Player") {
      persAttacker = this.searchPers(this.indexSelect, gameState);
      state = "Comp";
    } else {
      persAttacker = this.searchPers(this.indexSelectComp, gameState);
      state = "Player";
    }

    let persDefence = this.searchPers(index, state);

    let damage = Math.max(
      persAttacker.character.attack - persDefence.character.defence,
      persAttacker.character.attack * 0.1
    );

    await this.gamePlay.showDamage(index, damage);
    
    return new Promise((resolve) => {
      persDefence.character.health -= damage;
      this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);
      resolve();
    });
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

  computerMove() {
    let random = Math.floor(Math.random() * compTeam.team.length);
    let positionComp = compTeam.team[random];
    let persPlayer = null;

    this.indexSelectComp = positionComp.position;
    this.arrRadiusComp = this.gamePlay.radiusTurn(positionComp.position);

    for (let arr of this.arrRadiusComp) {
      for (let arrPers of playerTeam.team) {
        if (arr === arrPers.position) {
          persPlayer = arrPers;
        }
      }
    }

    if (persPlayer) {
      this.attackPers(persPlayer.position, gameState.motion);

      gameState.changingMotion();
    } else {
      let randomTurn = Math.floor(Math.random() * this.arrRadiusComp.length);
      positionComp.position = this.arrRadiusComp[randomTurn];
      this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);

      gameState.changingMotion();
    }
  }
}

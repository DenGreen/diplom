import themes from "./themes";
import { playerTeam, compTeam } from "./Team";
import { gameState } from "./GameState";
import { generateTeam } from "./generators";
import {
  Swordsman,
  Bowman,
  Magician,
  Daemon,
  Undead,
  Vampire,
} from "./specialCharacter";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.indexSelect = null; /** хранится выбранный персонаж */
    this.indexSelectComp = null;
    this.arrRadius = null;
    this.arrRadiusComp = null;
    this.indexTornSelect = null;
    this.level = 1;
    this.indexTargetAttac = null;
    this.summPoints = 0;
  }

  init() {
    const onCellEnterBind = this.onCellEnter.bind(this);
    const onCellLeaveBind = this.onCellLeave.bind(this);
    const onCellClickBind = this.onCellClick.bind(this);
    const onTurnEnterBind = this.onTurnEnter.bind(this);
    this.gamePlay.drawUi(themes["prairie"]);

    this.gamePlay.addCellEnterListener(onTurnEnterBind);
    this.gamePlay.addCellEnterListener(onCellEnterBind);
    this.gamePlay.addCellLeaveListener(onCellLeaveBind);
    this.gamePlay.addCellClickListener(onCellClickBind);

    generateTeam([Swordsman, Bowman, Magician], 1, 2, "Player");
    generateTeam([Daemon, Undead, Vampire], 1, 2, "Comp");
    this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  async onCellClick(index) {
    const char = this.gamePlay.cells[index].querySelector(".character");

    if (!char) {
      let pers = this.searchPers(this.indexSelect, gameState.motion);
      if (this.arrRadius.indexOf(index) !== -1) {
        pers.position = index;
        this.gamePlay.deselectCell(this.indexSelect);
        this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);

        gameState.changingMotion();
        this.computerMove();
      }
    } else if (
      char.classList.contains("bowman") ||
      char.classList.contains("swordsman") ||
      char.classList.contains("magician")
    ) {
      const rangeTravel = this.searchPers(index, gameState.motion).character
        .rangeTravel;

      if (this.indexSelect !== null)
        this.gamePlay.deselectCell(this.indexSelect);
      this.arrRadius = this.gamePlay.radiusTurn(
        index,
        rangeTravel
      ); /** Тут хранятся все ячейки на которые может пойти персонаж */

      this.gamePlay.setCursor("pointer");

      this.indexSelect = index;
      this.gamePlay.selectCell(index);
    } else {
      let attackRange = this.searchPers(this.indexSelect, gameState.motion)
        .character.attackRange;
      let attackRadius = this.gamePlay.radiusTurn(
        this.indexSelect,
        attackRange
      );
      for (let arr of attackRadius) {
        for (let arrPers of compTeam.team) {
          if (arr === arrPers.position) {
            await this.attackPers(index, gameState.motion);
            gameState.changingMotion();
            this.computerMove();
          }
        }
      }
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
      this.healthCheck();
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

  /** Метод использует окружение выбранного персонажа, для отрисовки разрешенных ходов и разрешенных радиусов атаки*/

  onTurnEnter(index) {
    if (this.indexSelect) {
      for (let arr of this.arrRadius) {
        if (arr === index) {
          this.gamePlay.setCursor("pointer");
          this.gamePlay.selectCell(index, "green");
          this.indexTornSelect = index;
        }
      }
      for (let arrCharComp of compTeam.team) {
        if (arrCharComp.position === index) {
          let attackRange = this.searchPers(this.indexSelect, gameState.motion)
            .character.attackRange;
          let attackRadius = this.gamePlay.radiusTurn(
            this.indexSelect,
            attackRange
          );
          if (attackRadius.indexOf(index) != -1) {
            this.indexTargetAttac = index;
            this.gamePlay.selectCell(index, "red");
            this.gamePlay.setCursor("crosshair");
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
    if (this.indexTargetAttac !== null)
      this.gamePlay.deselectTurn(this.indexTargetAttac);
  }

  computerMove() {
    try {
      let random = Math.floor(Math.random() * compTeam.team.length);
      let positionComp = compTeam.team[random];
      let persPlayer = null;

      this.indexSelectComp = positionComp.position;
      this.arrRadiusComp = this.gamePlay.radiusTurn(
        positionComp.position,
        positionComp.character.attackRange
      );

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
    } catch {}
  }

  healthCheck() {
    let charPlayer = playerTeam.team;
    let charComp = compTeam.team;
    for (let i = 0; i <= charPlayer.length - 1; i += 1) {
      if (charPlayer[i].character.health <= 0) {
        charPlayer.splice(i, 1);
        this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);
        this.teamCheck();
      }
    }
    for (let i = 0; i <= charComp.length - 1; i += 1) {
      if (charComp[i].character.health <= 0) {
        charComp.splice(i, 1);
        this.gamePlay.charPositionPush(playerTeam.team, compTeam.team);
        this.teamCheck();
      }
    }
  }

  scoringPoints() {
    for(let arr of playerTeam.team) {
      this.summPoints += arr.character.health;
    }
    document.getElementById('tablo_zn').textContent = this.summPoints;
  }

  teamCheck() {
    if (playerTeam.team.length === 0) {
      alert("Победил комьпютер");
    } else if (compTeam.team.length === 0) {
      this.level += 1;
      switch (this.level) {
        case 2:
          this.levelUp(themes.desert);
          break;
        case 3:
          this.levelUp(themes.arctic);
          break;
        case 4:
          this.levelUp(themes.mountain);
          break;
      }
    }
  }

  levelUp(tm) {
    this.gamePlay.drawUi(tm);
    this.scoringPoints();
    for (let char of playerTeam.team) {
      char.character.attack = Math.max(
        char.character.attack,
        (char.character.attack * (1.8 - char.character.health)) / 100
      );
      char.character.level += 1;
      char.character.health += 80;
      if (char.character.health >= 100) {
        char.character.health = 100;
      }
    }

    switch (tm) {
      case "desert":
        generateTeam([Swordsman, Bowman, Magician], 1, 1, "Player");
        generateTeam(
          [Daemon, Undead, Vampire],
          2,
          playerTeam.team.length,
          "Comp"
        );
        break;

      case "arctic":
        generateTeam([Swordsman, Bowman, Magician], 2, 1, "Player");
        generateTeam(
          [Daemon, Undead, Vampire, Daemon, Undead, Vampire],
          3,
          playerTeam.team.length,
          "Comp"
        );
        break;

      case "mountain":
        generateTeam(
          [Swordsman, Bowman, Magician, Swordsman, Bowman, Magician],
          3,
          1,
          "Player"
        );
        generateTeam(
          [Daemon, Undead, Vampire, Daemon, Undead, Vampire],
          4,
          playerTeam.team.length,
          "Comp"
        );
        break;
    }
  }
}

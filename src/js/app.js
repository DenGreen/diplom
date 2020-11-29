/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';
import {playerTeam, compTeam} from './Team';
import { generateTeam } from './generators';
import { Swordsman, Bowman, Magician, Daemon, Undead, Vampire } from './specialCharacter';
import {gameState} from './GameState'

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

/* Сздаем тимы и добавляем туда персонажей связанные с позицией */
playerTeam.team = generateTeam([Swordsman, Bowman, Magician], 1, 2, 'Player');
compTeam.team = generateTeam([Daemon, Undead, Vampire], 1, 2, 'Comp');
console.log(playerTeam)

/** Отрисовка персонажей*/
gamePlay.charPositionPush(playerTeam.team, compTeam.team);

gameState.changingMotion();

// don't write your code here

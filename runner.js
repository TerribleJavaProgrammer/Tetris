import {
  startMenu,
  ROWS,
  COLUMNS,
  game,
  colorBoard
} from './constants.js';
import { setupEventListeners } from './eventListeners.js';
import {
    scaleGame
} from './gameLogic.js';
import { updateDisplay } from './draw.js';
for (let i = 0; i < ROWS; i++) {
    game[i] = new Array(COLUMNS).fill(0);
    colorBoard[i] = new Array(COLUMNS).fill('black');
}

for (let i = 0; i < COLUMNS; i++) {
    game[ROWS - 1][i] = 1;
}

updateDisplay(0, 0);
setupEventListeners();
scaleGame();
startMenu.classList.remove('hidden');

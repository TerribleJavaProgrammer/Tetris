import {
  resumeButton,
  restartButton,
  startMenu,
  startButton,
  lossMenu,
  resetButton
} from './constants.js';
import { gameLoop, piece, nextPiece, heldPiece, paused, gameLoopRunning, holdPiece, pauseGame, resetGame, scaleGame, pauseWithoutPopup } from './gameLogic.js';
import { drawGame } from './draw.js';

export function setupEventListeners() {
    window.addEventListener('resize', scaleGame);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === ' ') {
            event.preventDefault();
        }
    });

    resumeButton.addEventListener('click', () => {
        pauseGame();
    });

    restartButton.addEventListener('click', () => {
        resetGame();
        pauseGame();
    });

    startButton.addEventListener('click', () => {
        gameLoop();
        startMenu.classList.add('hidden');
        document.addEventListener('keydown', handleKeyPress);
    });

    resetButton.addEventListener('click', () => {
        resetGame();
        pauseWithoutPopup();
        if (!gameLoopRunning) {
            gameLoop();
        }
        lossMenu.classList.add('hidden');
    });
}

function handleKeyPress(e) {
    if (paused) return;
    switch (e.key) {
        case 'ArrowLeft':
            piece.shiftL();
            break;
        case 'ArrowRight':
            piece.shiftR();
            break;
        case 'ArrowDown':
            piece.fall();
            break;
        case 'ArrowUp':
            piece.rotate();
            break;
        case 'a':
            piece.shiftL();
            break;
        case 'd':
            piece.shiftR();
            break;
        case 's':
            piece.fall();
            break;
        case 'w':
            piece.rotate();
            break;
        case ' ':
            piece.drop();
            break;
        case 'Escape':
            pauseGame();
            break;
        case 'c':
            holdPiece();
            break;
    }
    drawGame(nextPiece, heldPiece);
}

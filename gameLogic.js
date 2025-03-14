import { drawGame, updateDisplay } from './draw.js';
import { Piece } from './piece.js';
import {
  pauseMenu,
  lossMenu,
  ROWS,
  game,
  colorBoard,
  pieceColors,
  pieces
} from './constants.js';
import { updateHighScore } from './highScoreHandler.js';
import { debugString } from './debugStringHandler.js';

export let piece = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
export let nextPiece = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
export let heldPiece = null;
export let paused = false;
export let gameLoopRunning = false;
export let score = 0;
export let clearedLines = 0;


export function gameLoop() {
    if (!gameLoopRunning) {
        gameLoopRunning = true;
        if (!paused) {
            piece.ground();
            piece.fall();
            if (piece.grounded()) {
                piece = nextPiece;
                nextPiece = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
                score += 20;
                piece.ground();
                updateHighScore();
                if (piece.grounded()) {
                    lossMenu.classList.remove('hidden');
                    paused = !paused;
                }
            }
            const rowsComplete = clearFullLines();
            clearedLines += rowsComplete;
            score += (rowsComplete ** 2) * 100;
            updateDisplay(score, clearedLines);
            drawGame(nextPiece, heldPiece);
        }
        setTimeout(() => {
            gameLoopRunning = false;
            gameLoop();
        }, Math.max(100, 500 - 10 * clearedLines));
    }
}

function clearFullLines() {
    let rowsCleared = 0;
    for (let i = 0; i < ROWS - 1; i++) {
        const full = game[i].every(cell => cell === 1);
        if (full) {
            for (let k = i; k > 0; k--) {
                game[k] = [...game[k - 1]];
                colorBoard[k] = [...colorBoard[k - 1]];
            }
            game[0].fill(0);
            colorBoard[0].fill('black');
            rowsCleared++;
        }
    }
    return rowsCleared;
}

export function holdPiece() {
    let holder;
    try {
        holder = new Piece(heldPiece.getType(), game, colorBoard, pieceColors);
    } catch (e) {
        holder = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
    }
    heldPiece = new Piece(nextPiece.getType(), game, colorBoard, pieceColors);
    nextPiece = new Piece(holder.getType(), game, colorBoard, pieceColors);
    drawGame(nextPiece, heldPiece);
}

export function pauseGame() {
    paused = !paused;
    if (paused) {
        pauseMenu.classList.remove('hidden');
    } else {
        pauseMenu.classList.add('hidden');
        if (!gameLoopRunning) {
            gameLoop();
        }
    }
    console.log(debugString);
}

export function pauseWithoutPopup() {
    paused = !paused;
}

export function resetGame() {
    updateHighScore(score);
    score = 0;
    clearedLines = 0;
    piece = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
    nextPiece = new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
    heldPiece = new Piece("NONE");
    for (let i = 0; i < ROWS - 1; i++) {
        game[i].fill(0);
        colorBoard[i].fill('black');
    }
    updateDisplay(score, clearedLines);
    drawGame(nextPiece, heldPiece);
    gameLoop();
}

export function scaleGame() {
    const container = document.getElementById('gameContainer');
    const targetWidth = 600;
    const targetHeight = 800;

    const scaleX = window.innerWidth / targetWidth;
    const scaleY = window.innerHeight / targetHeight;
    const scale = Math.min(scaleX, scaleY, 10);

    container.style.transform = `scale(${scale})`;
}

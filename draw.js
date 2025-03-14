import { createBlockGradient } from './shader.js';
import {
  canvas,
  ctx,
  nextCanvas,
  nextCtx,
  heldCanvas,
  heldCtx,
  scoreDisplay,
  linesDisplay,
  highestDisplay,
  ROWS,
  COLUMNS,
  game,
  colorBoard,
  pieceColors,
  colorNameToHex
} from './constants.js';
import { updateDebugString } from './debugStringHandler.js';
import { getHighScore } from './highScoreHandler.js';
import { piece } from './gameLogic.js';

export function drawGame(nextPiece, heldPiece) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (i !== ROWS - 1) {
                if (game[i][j] !== 0 && colorBoard[i][j]) {
                    drawBlock(j, i - 1, colorNameToHex[colorBoard[i][j]], ctx);
                } else {
                    drawBlock(j, i - 1, 'black', ctx);
                }
            }
        }
    }
    let shadowArr = piece.getShadowCoords();
    drawBlock(shadowArr[0], shadowArr[1], 'outline', ctx);
    drawBlock(shadowArr[2], shadowArr[3], 'outline', ctx);
    drawBlock(shadowArr[4], shadowArr[5], 'outline', ctx);
    drawBlock(shadowArr[6], shadowArr[7], 'outline', ctx);
    updateDebugString();
    drawPiecePreview(nextPiece, nextCtx, nextCanvas);
    drawPiecePreview(heldPiece, heldCtx, heldCanvas);
}

export function updateDisplay(score, clearedLines) {
    scoreDisplay.textContent = `Score: ${score}`;
    linesDisplay.textContent = `Lines: ${clearedLines}`;
    highestDisplay.textContent = `Highest: ${getHighScore()}`;
}

function drawBlock(x, y, color, context) {
    const blockSize = 35;
    if (color == 'black') {
        context.fillStyle = color;
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.strokeStyle = 'darkgray';
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    } else if (color == 'outline') {
        context.fillStyle = "rgba(100, 100, 100, 0.5)";
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.strokeStyle = 'white';
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    } else {
        const gradient = createBlockGradient(context, x * blockSize, y * blockSize, color, blockSize);
        context.fillStyle = gradient;
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.strokeStyle = 'black';
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
}

function drawPiecePreview(piece, context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!piece) return;
    const pieceType = piece.getType();
    let arr;
    switch (pieceType) {
        case "O":
            arr = [[0, 0, 0], [0, 1, 1], [0, 1, 1], [0, 0, 0]];
            break;
        case "I":
            arr = [[0, 1], [0, 1], [0, 1], [0, 1]];
            break;
        case "S":
            arr = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [0, 0, 0]];
            break;
        case "Z":
            arr = [[0, 0, 0], [1, 1, 0], [0, 1, 1], [0, 0, 0]];
            break;
        case "L":
            arr = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];
            break;
        case "J":
            arr = [[0, 0, 1], [0, 0, 1], [0, 1, 1]];
            break;
        case "T":
            arr = [[0, 0, 0], [1, 1, 1], [0, 1, 0], [0, 0, 0]];
            break;
        default:
            return;
    }
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] == 1) {
                let color = colorNameToHex[pieceColors[pieceType]];
                drawBlock(j, i, color, context);
            }
        }
    }
}

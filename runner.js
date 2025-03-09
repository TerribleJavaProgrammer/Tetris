import Block from 'Tetris/Block.js';
import Piece from 'Tetris/Piece.js';

const ROWS = 21; // Number of rows in the game board.
const COLUMNS = 10; // Number of columns in the game board.
const game = []; // 2D array representing the game board. 0: empty, 1: grounded block, 2: moving piece.
const colorBoard = []; // 2D array for storing color information for each cell.

for (let i = 0; i < ROWS; i++) {
    game[i] = new Array(COLUMNS).fill(0); // Initialize each row with empty cells (0).
    colorBoard[i] = new Array(COLUMNS).fill('black'); // Initialize each row with black color.
}

for (let i = 0; i < COLUMNS; i++) {
    game[ROWS - 1][i] = 1; // Set the bottom row as grounded (1).
}

let piece; // Current moving piece.
let nextPiece; // Next piece to appear.
let heldPiece; // Held piece.
let score = 0; // Player's score.
let clearedLines = 0; // Number of lines cleared.
let paused = false; // Game pause state.
let gameLoopRunning = false; // Flag to prevent multiple game loops.
const canvas = document.getElementById('gameCanvas'); // Main game canvas.
const ctx = canvas.getContext('2d'); // Context for the main game canvas.
const nextCanvas = document.getElementById('nextPieceCanvas'); // Canvas for the next piece preview.
const nextCtx = nextCanvas.getContext('2d'); // Context for the next piece canvas.
const heldCanvas = document.getElementById('heldPieceCanvas'); // Canvas for the held piece preview.
const heldCtx = heldCanvas.getContext('2d'); // Context for the held piece canvas.
const scoreDisplay = document.getElementById('score'); // Score display element.
const linesDisplay = document.getElementById('lines'); // Lines cleared display element.
const pauseMenu = document.getElementById('pauseMenu'); // Pause menu element.
const resumeButton = document.getElementById('resumeButton'); // Resume button.
const restartButton = document.getElementById('restartButton'); // Restart button.
const startMenu = document.getElementById('startMenu'); // Start menu element.
const startButton = document.getElementById('startButton'); // Start button.
const lossMenu = document.getElementById('lossMenu'); // Loss menu element.
const resetButton = document.getElementById('resetButton'); // Reset button.
const pieceColors = { // Object mapping piece types to colors.
    "I": "cyan",
    "J": "blue",
    "L": "orange",
    "O": "yellow",
    "S": "green",
    "T": "purple",
    "Z": "red"
};

const colorNameToHex = {
    "cyan": "#00FFFF",
    "blue": "#0000FF",
    "orange": "#FFA500",
    "yellow": "#FFFF00",
    "green": "#008000",
    "purple": "#800080",
    "red": "#FF0000",
    "black": "#000000" // Add black here
};

document.addEventListener('keydown', function(event) { // Prevents default scrolling on arrow keys.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
    }
});

resumeButton.addEventListener('click', () => {
    pauseGame(); // Toggles pause state.
});

restartButton.addEventListener('click', () => {
    resetGame(); // Resets the game.
    pauseGame(); // Toggles pause state.
});

startButton.addEventListener('click', () => {
    gameLoop(); // Starts the game loop.
    startMenu.classList.add('hidden'); // Hides the start menu.
});

resetButton.addEventListener('click', () => {
    resetGame(); // Resets the game.
    pause(); // Toggles pause state.
    if (!gameLoopRunning) {
        gameLoop(); // Restarts the game loop if it's not running.
    }
    lossMenu.classList.add('hidden'); // Hides the loss menu.
});

function randomPiece() {
    const pieces = ["O", "I", "L", "J", "S", "Z", "T"]; // Array of piece types.
    return pieces[Math.floor(Math.random() * pieces.length)]; // Returns a random piece type.
}

function setupGame() {
    piece = new Piece(randomPiece(), game, colorBoard); // Creates the initial piece.
    nextPiece = new Piece(randomPiece(), game, colorBoard); // Creates the next piece.
    startMenu.classList.remove('hidden'); // Shows the start menu.
    document.addEventListener('keydown', handleKeyPress); // Adds event listener for key presses.
}

function handleKeyPress(e) {
    if (paused) return; // Ignores key presses if the game is paused.
    switch (e.key) {
        case 'ArrowLeft':
            piece.shiftL(); // Shifts the piece left.
            break;
        case 'ArrowRight':
            piece.shiftR(); // Shifts the piece right.
            break;
        case 'ArrowDown':
            piece.fall(); // Moves the piece down.
            break;
        case 'ArrowUp':
            piece.rotate(); // Rotates the piece.
            break;
        case ' ':
            piece.drop(); // Drops the piece.
            break;
        case 'Escape':
            pauseGame(); // Toggles pause state.
            break;
        case 'h':
            holdPiece(); // Holds the piece.
            break;
    }
    drawGame(); // Redraws the game board.
}

function holdPiece() {
    let holder;
    try {
        holder = new Piece(heldPiece.getType(), game, colorBoard); // Tries to create a piece from the held piece.
    } catch (e) {
        holder = new Piece(randomPiece(), game, colorBoard); // Creates a new random piece if there is no held piece.
    }
    heldPiece = new Piece(nextPiece.getType(), game, colorBoard); // Sets the held piece to the next piece.
    nextPiece = new Piece(holder.getType(), game, colorBoard); // Sets the next piece to the previous held piece.
    drawGame();
}

function gameLoop() {
    if (!gameLoopRunning) {
        gameLoopRunning = true; // Sets the game loop running flag.
        if (!paused) {
            piece.ground(); // Grounds the current piece if needed.
            piece.fall(); // Moves the piece down.
            if (piece.grounded()) {
                piece = nextPiece; // Sets the current piece to the next piece.
                nextPiece = new Piece(randomPiece(), game, colorBoard); // Creates a new next piece.
                piece.ground(); // Grounds the new piece.
                if (piece.grounded()) { // Checks for game over.
                    lossMenu.classList.remove('hidden'); // Shows the loss menu.
                    pause(); // Pauses the game.
                }
            }
            const rowsComplete = clearFullLines(); // Clears full lines.
            clearedLines += rowsComplete; // Updates cleared lines count.
            score += (rowsComplete ** 2) * 100; // Updates score.
            updateDisplay(); // Updates the score and lines display.
            drawGame(); // Redraws the game board.
        }
        setTimeout(() => {
            gameLoopRunning = false; // Resets the game loop running flag.
            gameLoop(); // Calls the game loop again.
        }, Math.max(100, 500 - 10 * clearedLines)); // Sets the game loop speed.
    }
}

function clearFullLines() {
    let rowsCleared = 0;
    for (let i = 0; i < ROWS - 1; i++) {
        const full = game[i].every(cell => cell === 1); // Checks if a row is full.
        if (full) {
            for (let k = i; k > 0; k--) { // Moves rows down.
                game[k] = [...game[k - 1]];
                colorBoard[k] = [...colorBoard[k - 1]];
            }
            game[0].fill(0); // Clears the top row.
            colorBoard[0].fill('black'); // Resets color of top row.
            rowsCleared++;
        }
    }
    return rowsCleared;
}

function resetGame() {
    score = 0; // Resets the player's score to 0.
    clearedLines = 0; // Resets the number of cleared lines to 0.
    for (let i = 0; i < ROWS - 1; i++) {
        game[i].fill(0); // Fills each row of the game board (except the last, which is the floor) with 0, effectively clearing it.
        colorBoard[i].fill('black'); // Resets the color board to black, clearing any previous colors.
    }
    piece = new Piece(randomPiece(), game, colorBoard); // Creates a new random piece as the current piece.
    nextPiece = new Piece(randomPiece(), game, colorBoard); // Creates a new random piece as the next piece.
    updateDisplay(); // Updates the score and lines display with the reset values.
    drawGame(); // Redraws the game board to reflect the reset state.
    gameLoop(); // Restarts the game loop.
}

function pauseGame() {
    paused = !paused; // Toggles the pause state.
    if (paused) {
        pauseMenu.classList.remove('hidden'); // Shows the pause menu if the game is paused.
    } else {
        pauseMenu.classList.add('hidden'); // Hides the pause menu if the game is resumed.
        if (!gameLoopRunning) {
            gameLoop(); // Restarts the game loop if it's not already running.
        }
    }
}

function pause() {
    paused = !paused; // Toggles the pause state without managing the menu. Used for loss menu interactions.
}

function updateDisplay() {
    scoreDisplay.textContent = `Score: ${score}`; // Updates the score display with the current score.
    linesDisplay.textContent = `Lines: ${clearedLines}`; // Updates the lines display with the current number of cleared lines.
}

// *experimental area*
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (i !== ROWS - 1) {
                if (game[i][j] !== 0 && colorBoard[i][j]) {
                    drawBlock(j, i, colorNameToHex[colorBoard[i][j]]);
                } else {
                    drawBlock(j, i, 'black');
                }
            }
        }
    }
    drawPiecePreview(nextCtx, nextPiece, nextCanvas);
    drawPiecePreview(heldCtx, heldPiece, heldCanvas);
}

function drawBlock(x, y, color) {
    const blockSize = 30;
    if (color === 'black') {
        ctx.fillStyle = color;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = 'darkgray';
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    } else {
        const gradient = createBlockGradient(ctx, x * blockSize, y * blockSize, color, blockSize);
        ctx.fillStyle = gradient;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = 'darkgray';
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
}

function createBlockGradient(ctx, x, y, color, blockSize) {
    const gradient = ctx.createLinearGradient(x, y, x + blockSize, y + blockSize);
    const lightColor = lightenColor(color, 255);
    const darkColor = darkenColor(color, 255);
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(1, darkColor);
    return gradient;
}

function lightenColor(color, amount) {
    let rgb = hexToRgb(color);
    rgb.r = Math.min(255, rgb.r + amount);
    rgb.g = Math.min(255, rgb.g + amount);
    rgb.b = Math.min(255, rgb.b + amount);
    return rgbToHex(rgb);
}

function darkenColor(color, amount) {
    let rgb = hexToRgb(color);
    rgb.r = Math.max(0, rgb.r - amount);
    rgb.g = Math.max(0, rgb.g - amount);
    rgb.b = Math.max(0, rgb.b - amount);
    return rgbToHex(rgb);
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHex(rgb) {
    let r = rgb.r.toString(16),
        g = rgb.g.toString(16),
        b = rgb.b.toString(16);
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    return "#" + r + g + b;
}
// *experimental area*

function drawPiecePreview(context, pieceToDraw, previewCanvas) {
    context.clearRect(0, 0, previewCanvas.width, previewCanvas.height); // Clears the preview canvas.
    if (!pieceToDraw) return; // Returns if there's no piece to draw.
    const pieceType = pieceToDraw.getType(); // Gets the type of the piece.
    let arr; // Array to represent the piece's shape.
    switch (pieceType) { // Defines the shape of the piece based on its type.
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
            return; // Returns if the piece type is invalid.
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 1) { // Checks if the cell is part of the piece.
                context.fillStyle = pieceColors[pieceType]; // Sets the fill color to the piece's color.
                context.fillRect(j * 30, i * 30, 30, 30); // Draws the piece block.
                context.strokeStyle = 'black'; // Sets the stroke color for the block's border.
                context.strokeRect(j * 30, i * 30, 30, 30); // Draws the block's border.
            }
        }
    }
}

setupGame(); // Initializes the game

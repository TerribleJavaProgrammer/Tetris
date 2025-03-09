class Block {
    constructor(x, y, grounded) {
        this.x = x; // Horizontal position of the block.
        this.y = y; // Vertical position of the block.
        this.grounded = grounded; // Indicates if the block is grounded (has landed).
    }
    
    isGrounded() {
        return this.grounded; // Returns whether the block is currently grounded.
    }
    
    ground() {
        this.grounded = true; // Sets the block's grounded status to true.
    }
    
    fall() {
        this.y++; // Moves the block down one row (increments the y-coordinate).
    }
    
    shiftR() {
        this.x++; // Moves the block one column to the right (increments the x-coordinate).
    }
    
    shiftL() {
        this.x--; // Moves the block one column to the left (decrements the x-coordinate).
    }
    
    set(x, y) {
        this.x = x; // Sets the horizontal position of the block to a new value.
        this.y = y; // Sets the vertical position of the block to a new value.
    }
    
    getX() {
        return this.x; // Returns the current horizontal position of the block.
    }
    
    getY() {
        return this.y; // Returns the current vertical position of the block.
    }
    
    testFall(arr) {
        return arr[this.y + 1] && arr[this.y + 1][this.x] === 1; // Checks if the block can fall without colliding with a grounded block below.
        // arr[this.y + 1]: Accesses the row below the current block.
        // arr[this.y + 1][this.x]: Checks if the cell directly below is occupied by a grounded block (value 1).
    }
    
    canShiftL(arr) {
        if (this.x - 1 >= 0) { // Checks if the block is not at the left edge.
            return arr[this.y] && (arr[this.y][this.x - 1] === 0 || arr[this.y][this.x - 1] === 2); // Checks if the cell to the left is empty (0) or part of the current moving piece (2).
        }
        return false; // Returns false if the block is at the left edge.
    }
    
    canShiftR(arr) {
        if (this.x + 1 < 10) { // Checks if the block is not at the right edge.
            return arr[this.y] && (arr[this.y][this.x + 1] === 0 || arr[this.y][this.x + 1] === 2); // Checks if the cell to the right is empty (0) or part of the current moving piece (2).
        }
        return false; // Returns false if the block is at the right edge.
    }
    
    testIndex(x, y, arr) {
        try {
            return arr[y] && (arr[y][x] === 0 || arr[y][x] === 2); // Checks if a given cell (x, y) is empty (0) or part of the current moving piece (2).
        } catch (e) {
            return false; // Returns false if the cell is out of bounds.
        }
    }
}

class Piece {
    constructor(type, arr, colorArr) {
        this.type = type; // Stores the type of the Tetris piece (e.g., "I", "O", "T").
        this.arr = arr; // Stores a reference to the game board array, used for collision detection.
        this.colorArr = colorArr; // Stores a reference to the color board array, used for rendering.
        this._grounded = false; // Initializes the grounded status of the piece to false.
        switch (type) { // Determines the initial position of the piece's blocks based on its type.
            case "O":
                this.block1 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block2 = new Block(5, 0, false); // Creates a new Block object at (5, 0).
                this.block3 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                this.block4 = new Block(5, 1, false); // Creates a new Block object at (5, 1).
                break;
            case "I":
                this.block1 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block2 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                this.block3 = new Block(4, 2, false); // Creates a new Block object at (4, 2).
                this.block4 = new Block(4, 3, false); // Creates a new Block object at (4, 3).
                break;
            case "S":
                this.block1 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block2 = new Block(5, 0, false); // Creates a new Block object at (5, 0).
                this.block3 = new Block(3, 1, false); // Creates a new Block object at (3, 1).
                this.block4 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                break;
            case "Z":
                this.block1 = new Block(3, 0, false); // Creates a new Block object at (3, 0).
                this.block2 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block3 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                this.block4 = new Block(5, 1, false); // Creates a new Block object at (5, 1).
                break;
            case "L":
                this.block1 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block2 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                this.block3 = new Block(4, 2, false); // Creates a new Block object at (4, 2).
                this.block4 = new Block(5, 2, false); // Creates a new Block object at (5, 2).
                break;
            case "J":
                this.block1 = new Block(5, 0, false); // Creates a new Block object at (5, 0).
                this.block2 = new Block(5, 1, false); // Creates a new Block object at (5, 1).
                this.block3 = new Block(5, 2, false); // Creates a new Block object at (5, 2).
                this.block4 = new Block(4, 2, false); // Creates a new Block object at (4, 2).
                break;
            case "T":
                this.block1 = new Block(3, 0, false); // Creates a new Block object at (3, 0).
                this.block2 = new Block(4, 0, false); // Creates a new Block object at (4, 0).
                this.block3 = new Block(5, 0, false); // Creates a new Block object at (5, 0).
                this.block4 = new Block(4, 1, false); // Creates a new Block object at (4, 1).
                break;
            default:
                throw new Error("Invalid piece type"); // Throws an error if an unknown piece type is provided.
        }
    }
    
    ground() {
        this.checkGround(); // Checks if the piece is grounded.
        if (this._grounded) { // If the piece is grounded, marks its blocks as grounded and updates the game board.
            this.block1.ground();
            this.block2.ground();
            this.block3.ground();
            this.block4.ground();
            this.arr[this.block1.getY()][this.block1.getX()] = 1; // Mark the block's position as occupied (grounded) in the game board array.
            this.arr[this.block2.getY()][this.block2.getX()] = 1;
            this.arr[this.block3.getY()][this.block3.getX()] = 1;
            this.arr[this.block4.getY()][this.block4.getX()] = 1;
            this.colorArr[this.block1.getY()][this.block1.getX()] = pieceColors[this.type]; // Updates color array
            this.colorArr[this.block2.getY()][this.block2.getX()] = pieceColors[this.type];
            this.colorArr[this.block3.getY()][this.block3.getX()] = pieceColors[this.type];
            this.colorArr[this.block4.getY()][this.block4.getX()] = pieceColors[this.type];
        }
    }
    
    checkGround() {
        this._grounded = this.block1.testFall(this.arr) ||
            this.block2.testFall(this.arr) ||
            this.block3.testFall(this.arr) ||
            this.block4.testFall(this.arr); // Checks if any of the piece's blocks are grounded.
        return this._grounded;
    }
    
    fall() {
        if (!this.checkGround()) { // If the piece is not grounded, moves it down.
            this.clear(); // Clears the piece's current position from the game board.
            this.block1.fall(); // Moves each block of the piece down.
            this.block2.fall();
            this.block3.fall();
            this.block4.fall();
            this.insert(); // Inserts the piece into its new position.
        }
    }
    
    rotate() {
        const canRotate = this.block1.testIndex(-this.block1.getY() + this.block2.getY() + this.block2.getX(), this.block1.getX() - this.block2.getX() + this.block2.getY(), this.arr) &&
            this.block3.testIndex(-this.block3.getY() + this.block2.getY() + this.block2.getX(), this.block3.getX() - this.block2.getX() + this.block2.getY(), this.arr) &&
            this.block4.testIndex(-this.block4.getY() + this.block2.getY() + this.block2.getX(), this.block4.getX() - this.block2.getX() + this.block2.getY(), this.arr); // Checks if the piece can rotate without colliding.
        if (!this.checkGround() && canRotate) { // If the piece can rotate, rotates it.
            this.clear();
            this.block1.set(-this.block1.getY() + this.block2.getY() + this.block2.getX(), this.block1.getX() - this.block2.getX() + this.block2.getY()); //Rotates blocks around block 2
            this.block3.set(-this.block3.getY() + this.block2.getY() + this.block2.getX(), this.block3.getX() - this.block2.getX() + this.block2.getY());
            this.block4.set(-this.block4.getY() + this.block2.getY() + this.block2.getX(), this.block4.getX() - this.block2.getX() + this.block2.getY());
            this.insert();
        }
    }
    
    shiftR() {
        if (this.block1.canShiftR(this.arr) && this.block2.canShiftR(this.arr) && this.block3.canShiftR(this.arr) && this.block4.canShiftR(this.arr)) { // Checks if the piece can shift right without colliding.
            this.clear();
            this.block1.shiftR();
            this.block2.shiftR();
            this.block3.shiftR();
            this.block4.shiftR();
            this.insert();
        }
    }
    
    shiftL() {
        if (this.block1.canShiftL(this.arr) && this.block2.canShiftL(this.arr) && this.block3.canShiftL(this.arr) && this.block4.canShiftL(this.arr)) { // Checks if the piece can shift left without colliding.
            this.clear();
            this.block1.shiftL();
            this.block2.shiftL();
            this.block3.shiftL();
            this.block4.shiftL();
            this.insert();
        }
    }
    
    drop() {
        while (!this.checkGround()) { // Drops the piece until it's grounded.
            this.clear();
            this.block1.fall();
            this.block2.fall();
            this.block3.fall();
            this.block4.fall();
            this.insert();
            this.ground();
        }
    }
    
    insert() {
        this.arr[this.block1.getY()][this.block1.getX()] = 2; // Inserts the piece into the game board array, marking its blocks as part of the currently moving piece. 2 is active state, 1 is grounded state.
        this.arr[this.block2.getY()][this.block2.getX()] = 2;
        this.arr[this.block3.getY()][this.block3.getX()] = 2;
        this.arr[this.block4.getY()][this.block4.getX()] = 2;
        this.colorArr[this.block1.getY()][this.block1.getX()] = pieceColors[this.type]; // Updates the color array.
        this.colorArr[this.block2.getY()][this.block2.getX()] = pieceColors[this.type];
        this.colorArr[this.block3.getY()][this.block3.getX()] = pieceColors[this.type];
        this.colorArr[this.block4.getY()][this.block4.getX()] = pieceColors[this.type];
    }
    
    clear() {
        this.arr[this.block1.getY()][this.block1.getX()] = 0; // Clears the piece's current position from the game board array.
        this.arr[this.block2.getY()][this.block2.getX()] = 0;
        this.arr[this.block3.getY()][this.block3.getX()] = 0;
        this.arr[this.block4.getY()][this.block4.getX()] = 0;
        this.colorArr[this.block1.getY()][this.block1.getX()] = 'black'; // Resets the color array to black.
        this.colorArr[this.block2.getY()][this.block2.getX()] = 'black';
        this.colorArr[this.block3.getY()][this.block3.getX()] = 'black';
        this.colorArr[this.block4.getY()][this.block4.getX()] = 'black';
    }
    
    getType() {
        return this.type; // Returns the type of the piece.
    }
    
    grounded() {
        return this._grounded; // Returns whether the piece is grounded.
    }
}

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

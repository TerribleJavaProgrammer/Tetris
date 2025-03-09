class Block {
    constructor(x, y, grounded) {
        this.x = x;
        this.y = y;
        this.grounded = grounded;
    }
    
    isGrounded() {
        return this.grounded;
    }
    
    ground() {
        this.grounded = true;
    }
    
    fall() {
        this.y++;
    }
    
    shiftR() {
        this.x++;
    }
    
    shiftL() {
        this.x--;
    }
    
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    testFall(arr) {
        return arr[this.y + 1] && arr[this.y + 1][this.x] === 1;
    }
    
    canShiftL(arr) {
        if (this.x - 1 >= 0) {
            return arr[this.y] && (arr[this.y][this.x - 1] === 0 || arr[this.y][this.x - 1] === 2);
        }
        return false;
    }
    
    canShiftR(arr) {
        if (this.x + 1 < 10) {
            return arr[this.y] && (arr[this.y][this.x + 1] === 0 || arr[this.y][this.x + 1] === 2);
        }
        return false;
    }
    
    testIndex(x, y, arr) {
        try {
            return arr[y] && (arr[y][x] === 0 || arr[y][x] === 2);
        } catch (e) {
            return false;
        }
    }
}

class Piece {
    constructor(type, arr, colorArr) {
        this.type = type;
        this.arr = arr;
        this.colorArr = colorArr;
        this._grounded = false;
        switch (type) {
            case "O":
                this.block1 = new Block(4, 0, false);
                this.block2 = new Block(5, 0, false);
                this.block3 = new Block(4, 1, false);
                this.block4 = new Block(5, 1, false);
                break;
            case "I":
                this.block1 = new Block(4, 0, false);
                this.block2 = new Block(4, 1, false);
                this.block3 = new Block(4, 2, false);
                this.block4 = new Block(4, 3, false);
                break;
            case "S":
                this.block1 = new Block(4, 0, false);
                this.block2 = new Block(5, 0, false);
                this.block3 = new Block(3, 1, false);
                this.block4 = new Block(4, 1, false);
                break;
            case "Z":
                this.block1 = new Block(3, 0, false);
                this.block2 = new Block(4, 0, false);
                this.block3 = new Block(4, 1, false);
                this.block4 = new Block(5, 1, false);
                break;
            case "L":
                this.block1 = new Block(4, 0, false);
                this.block2 = new Block(4, 1, false);
                this.block3 = new Block(4, 2, false);
                this.block4 = new Block(5, 2, false);
                break;
            case "J":
                this.block1 = new Block(5, 0, false);
                this.block2 = new Block(5, 1, false);
                this.block3 = new Block(5, 2, false);
                this.block4 = new Block(4, 2, false);
                break;
            case "T":
                this.block1 = new Block(3, 0, false);
                this.block2 = new Block(4, 0, false);
                this.block3 = new Block(5, 0, false);
                this.block4 = new Block(4, 1, false);
                break;
            default:
                throw new Error("Invalid piece type");
        }
    }
    
    ground() {
        this.checkGround();
        if (this._grounded) {
            this.block1.ground();
            this.block2.ground();
            this.block3.ground();
            this.block4.ground();
            this.arr[this.block1.getY()][this.block1.getX()] = 1;
            this.arr[this.block2.getY()][this.block2.getX()] = 1;
            this.arr[this.block3.getY()][this.block3.getX()] = 1;
            this.arr[this.block4.getY()][this.block4.getX()] = 1;
            this.colorArr[this.block1.getY()][this.block1.getX()] = pieceColors[this.type];
            this.colorArr[this.block2.getY()][this.block2.getX()] = pieceColors[this.type];
            this.colorArr[this.block3.getY()][this.block3.getX()] = pieceColors[this.type];
            this.colorArr[this.block4.getY()][this.block4.getX()] = pieceColors[this.type];
        }
    }
    
    checkGround() {
        this._grounded = this.block1.testFall(this.arr) ||
            this.block2.testFall(this.arr) ||
            this.block3.testFall(this.arr) ||
            this.block4.testFall(this.arr);
        return this._grounded;
    }
    
    fall() {
        if (!this.checkGround()) {
            this.clear();
            this.block1.fall();
            this.block2.fall();
            this.block3.fall();
            this.block4.fall();
            this.insert();
        }
    }
    
    rotate() {
        const canRotate = this.block1.testIndex(-this.block1.getY() + this.block2.getY() + this.block2.getX(), this.block1.getX() - this.block2.getX() + this.block2.getY(), this.arr) &&
            this.block3.testIndex(-this.block3.getY() + this.block2.getY() + this.block2.getX(), this.block3.getX() - this.block2.getX() + this.block2.getY(), this.arr) &&
            this.block4.testIndex(-this.block4.getY() + this.block2.getY() + this.block2.getX(), this.block4.getX() - this.block2.getX() + this.block2.getY(), this.arr);
        if (!this.checkGround() && canRotate) {
            this.clear();
            this.block1.set(-this.block1.getY() + this.block2.getY() + this.block2.getX(), this.block1.getX() - this.block2.getX() + this.block2.getY());
            this.block3.set(-this.block3.getY() + this.block2.getY() + this.block2.getX(), this.block3.getX() - this.block2.getX() + this.block2.getY());
            this.block4.set(-this.block4.getY() + this.block2.getY() + this.block2.getX(), this.block4.getX() - this.block2.getX() + this.block2.getY());
            this.insert();
        }
    }
    
    shiftR() {
        if (this.block1.canShiftR(this.arr) && this.block2.canShiftR(this.arr) && this.block3.canShiftR(this.arr) && this.block4.canShiftR(this.arr)) {
            this.clear();
            this.block1.shiftR();
            this.block2.shiftR();
            this.block3.shiftR();
            this.block4.shiftR();
            this.insert();
        }
    }
    
    shiftL() {
        if (this.block1.canShiftL(this.arr) && this.block2.canShiftL(this.arr) && this.block3.canShiftL(this.arr) && this.block4.canShiftL(this.arr)) {
            this.clear();
            this.block1.shiftL();
            this.block2.shiftL();
            this.block3.shiftL();
            this.block4.shiftL();
            this.insert();
        }
    }
    
    drop() {
        while (!this.checkGround()) {
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
        this.arr[this.block1.getY()][this.block1.getX()] = 2;
        this.arr[this.block2.getY()][this.block2.getX()] = 2;
        this.arr[this.block3.getY()][this.block3.getX()] = 2;
        this.arr[this.block4.getY()][this.block4.getX()] = 2;
        this.colorArr[this.block1.getY()][this.block1.getX()] = pieceColors[this.type];
        this.colorArr[this.block2.getY()][this.block2.getX()] = pieceColors[this.type];
        this.colorArr[this.block3.getY()][this.block3.getX()] = pieceColors[this.type];
        this.colorArr[this.block4.getY()][this.block4.getX()] = pieceColors[this.type];
    }
    
    clear() {
        this.arr[this.block1.getY()][this.block1.getX()] = 0;
        this.arr[this.block2.getY()][this.block2.getX()] = 0;
        this.arr[this.block3.getY()][this.block3.getX()] = 0;
        this.arr[this.block4.getY()][this.block4.getX()] = 0;
        this.colorArr[this.block1.getY()][this.block1.getX()] = 'black';
        this.colorArr[this.block2.getY()][this.block2.getX()] = 'black';
        this.colorArr[this.block3.getY()][this.block3.getX()] = 'black';
        this.colorArr[this.block4.getY()][this.block4.getX()] = 'black';
    }
    
    getType() {
        return this.type;
    }
    
    grounded() {
        return this._grounded;
    }
}

const ROWS = 21;
const COLUMNS = 10;
const game = [];
const colorBoard = [];

for (let i = 0; i < ROWS; i++) {
    game[i] = new Array(COLUMNS).fill(0);
    colorBoard[i] = new Array(COLUMNS).fill('black');
}

for (let i = 0; i < COLUMNS; i++) {
    game[ROWS - 1][i] = 1;
}

let piece;
let nextPiece;
let heldPiece;
let score = 0;
let clearedLines = 0;
let paused = false;
let gameLoopRunning = false;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextPieceCanvas');
const nextCtx = nextCanvas.getContext('2d');
const heldCanvas = document.getElementById('heldPieceCanvas');
const heldCtx = heldCanvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const linesDisplay = document.getElementById('lines');
const pauseMenu = document.getElementById('pauseMenu');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const startMenu = document.getElementById('startMenu');
const startButton = document.getElementById('startButton');
const lossMenu = document.getElementById('lossMenu');
const resetButton = document.getElementById('resetButton');
const pieceColors = {
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
    "black": "#000000"
};

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
});

resetButton.addEventListener('click', () => {
    resetGame();
    pause();
    if (!gameLoopRunning) {
        gameLoop();
    }
    lossMenu.classList.add('hidden');
});

function randomPiece() {
    const pieces = ["O", "I", "L", "J", "S", "Z", "T"];
    return pieces[Math.floor(Math.random() * pieces.length)];
}

function setupGame() {
    piece = new Piece(randomPiece(), game, colorBoard);
    nextPiece = new Piece(randomPiece(), game, colorBoard);
    startMenu.classList.remove('hidden');
    document.addEventListener('keydown', handleKeyPress);
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
        case ' ':
            piece.drop();
            break;
        case 'Escape':
            pauseGame();
            break;
        case 'h':
            holdPiece();
            break;
    }
    drawGame();
}

function holdPiece() {
    let holder;
    try {
        holder = new Piece(heldPiece.getType(), game, colorBoard);
    } catch (e) {
        holder = new Piece(randomPiece(), game, colorBoard);
    }
    heldPiece = new Piece(nextPiece.getType(), game, colorBoard);
    nextPiece = new Piece(holder.getType(), game, colorBoard);
    drawGame();
}

function gameLoop() {
    if (!gameLoopRunning) {
        gameLoopRunning = true;
        if (!paused) {
            piece.ground();
            piece.fall();
            if (piece.grounded()) {
                piece = nextPiece;
                nextPiece = new Piece(randomPiece(), game, colorBoard);
                piece.ground();
                if (piece.grounded()) {
                    lossMenu.classList.remove('hidden');
                    pause();
                }
            }
            const rowsComplete = clearFullLines();
            clearedLines += rowsComplete;
            score += (rowsComplete ** 2) * 100;
            updateDisplay();
            drawGame();
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

function resetGame() {
    score = 0;
    clearedLines = 0;
    for (let i = 0; i < ROWS - 1; i++) {
        game[i].fill(0);
        colorBoard[i].fill('black');
    }
    piece = new Piece(randomPiece(), game, colorBoard);
    nextPiece = new Piece(randomPiece(), game, colorBoard);
    updateDisplay();
    drawGame();
    gameLoop();
}

function pauseGame() {
    paused = !paused;
    if (paused) {
        pauseMenu.classList.remove('hidden');
    } else {
        pauseMenu.classList.add('hidden');
        if (!gameLoopRunning) {
            gameLoop();
        }
    }
}

function pause() {
    paused = !paused;
}

function updateDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
    linesDisplay.textContent = `Lines: ${clearedLines}`;
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
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
}

function createBlockGradient(ctx, x, y, color, blockSize) {
    const gradient = ctx.createLinearGradient(x, y, x + blockSize, y + blockSize);
    const lightColor = lightenColor(color, 50);
    const darkColor = darkenColor(color, 50);
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

function drawPiecePreview(context, pieceToDraw, previewCanvas) {
    context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    if (!pieceToDraw) return;
    const pieceType = pieceToDraw.getType();
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
            if (arr[i][j] === 1) {
                drawBlock(j*30, i*30, colorToHex[pieceColors[pieceType]]);
            }
            else {
                drawBlock(j*30, i*30, 'black');
            }
        }
    }
}

setupGame();

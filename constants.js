export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');
export const nextCanvas = document.getElementById('nextPieceCanvas');
export const nextCtx = nextCanvas.getContext('2d');
export const heldCanvas = document.getElementById('heldPieceCanvas');
export const heldCtx = heldCanvas.getContext('2d');
export const scoreDisplay = document.getElementById('score');
export const linesDisplay = document.getElementById('lines');
export const highestDisplay = document.getElementById('highest');
export const pauseMenu = document.getElementById('pauseMenu');
export const resumeButton = document.getElementById('resumeButton');
export const restartButton = document.getElementById('restartButton');
export const startMenu = document.getElementById('startMenu');
export const startButton = document.getElementById('startButton');
export const lossMenu = document.getElementById('lossMenu');
export const resetButton = document.getElementById('resetButton');
export const ROWS = 22;
export const COLUMNS = 10;
export const game = [];
export const colorBoard = [];
export const pieceColors = {
    "I": "cyan",
    "J": "blue",
    "L": "orange",
    "O": "yellow",
    "S": "green",
    "T": "purple",
    "Z": "red"
};
export const colorNameToHex = {
    "cyan": "#00FFFF",
    "blue": "#0000FF",
    "orange": "#FFA500",
    "yellow": "#FFFF00",
    "green": "#008000",
    "purple": "#800080",
    "red": "#FF0000",
    "black": "#000000"
};
export const pieces = ["O", "I", "L", "J", "S", "Z", "T"];

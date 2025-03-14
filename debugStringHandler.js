import {
    ROWS,
    COLUMNS,
    game
} from './constants.js';

export let debugString = "";

export function updateDebugString() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (i !== ROWS - 1) {
                debugString += game[i][j] + " ";
            }
        }
        debugString += "\n";
    }
    debugString += "-------------------\n";
}

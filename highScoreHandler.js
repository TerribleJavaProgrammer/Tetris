const highScoreKey = "tetrisHighScore";

export function getHighScore() {
    const highScoreString = localStorage.getItem(highScoreKey);
    if (highScoreString) {
        return parseInt(highScoreString);
    } else {
        return 0;
    }
}

function saveHighScore(score) {
    localStorage.setItem(highScoreKey, score.toString());
}

export function updateHighScore(score) {
    const currentHighScore = getHighScore();
    if (score > currentHighScore) {
        saveHighScore(score);
  }
}

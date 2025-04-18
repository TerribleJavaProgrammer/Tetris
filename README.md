# Tetris

As a foray into web development, I have created this website for Tetris. I have aimed to modularize the code in a way that makes it as easy as possible to read.

---

### block.js
- Contains the class for individual blocks within the tetrominoes.
- Very simple.

### constants.js
- Contains all the 'const' variables for this program.

### draw.js
- Contains the functions to draw the:
    - Game
    - 'Next' Preview Box
    - 'Held' Preview Box
    - 'Score' Display
    - 'Cleared Lines' Display

### eventListeners.js
- Contains all the event listeners for the website. Also contains the key press handler.

### gameLogic.js
- Contains:
    - Game variables
    - Game loop
    - Line checker & clearer
    - Piece holding logic
    - Game pausing logic
    - Game resetting logic
    - Game scaling (based on window size) logic

### index.html
- Contains html contents of the website. Nothing major.

### piece.js
- Contains the fundamental functions for the tetrominoes.
- Also includes functions to check the state of the tetrominoes.

### runner.js
- Contains the code to 'boot up' the website. Nothing major.

### shader.js
- Contains the function to create gradients on the blocks. Crucial for the texturing.

### style.css
- Contains styling elements for what is in the html. Nothing major.

---

Tetris was a great learning project. I hope you enjoy this website!

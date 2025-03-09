import Block from './Block.js';

export default class Piece {
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

export default class Block {
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

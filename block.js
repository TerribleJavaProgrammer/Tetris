export class Block {
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

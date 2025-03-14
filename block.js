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
            return arr[this.y] && (arr[this.y][this.x - 1] != 1);
        }
        return false;
    }
    
    canShiftR(arr) {
        if (this.x + 1 < 10) {
            return arr[this.y] && (arr[this.y][this.x + 1] != 1);
        }
        return false;
    }
    
    testIndex(x, y, arr) {
        try {
            if (!(arr[y] && (arr[y][x] != 1) && (0 <= x) && (x < 10) && (y + 1 <= 22) && (y >= 0))) {
                console.log(!arr[y]);
                console.log(arr[y][x]);
                console.log(0 <= x);
                console.log(x < 10);
                console.log(y + 1 <= 22);
                console.log(y >= 0);
                return false;
            }
            return true;
        } catch (e) {
                try{console.log(!arr[y]);} catch(e) {console.log("error; y = " + y + " error is: " + e);}
                try{console.log(arr[y][x]);} catch(e) {console.log("error");}
                try{console.log(0 <= x);} catch(e) {console.log("error");}
                try{console.log(x < 10);} catch(e) {console.log("error");}
                try{console.log(y + 1 <= 22);} catch(e) {console.log("error");}
                try{console.log(y >= 0);} catch(e) {console.log("error");}
            return false;
        }
    }
}

import { Block } from './block.js';
import {
  game,
  colorBoard,
  pieceColors,
} from './constants.js';

export class Piece {
    constructor(type) {
        this.type = type;
        this.arr = game;
        this.colorArr = colorBoard;
        this._grounded = false;
        this.pieceColors = pieceColors;
        switch (type) {
            case "NONE":
                this.type = "";
                break;
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
            this.colorArr[this.block1.getY()][this.block1.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block2.getY()][this.block2.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block3.getY()][this.block3.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block4.getY()][this.block4.getX()] = this.pieceColors[this.type];
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
        this.colorArr[this.block1.getY()][this.block1.getX()] = this.pieceColors[this.type];
        this.colorArr[this.block2.getY()][this.block2.getX()] = this.pieceColors[this.type];
        this.colorArr[this.block3.getY()][this.block3.getX()] = this.pieceColors[this.type];
        this.colorArr[this.block4.getY()][this.block4.getX()] = this.pieceColors[this.type];
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

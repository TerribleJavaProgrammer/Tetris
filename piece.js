import { Block } from './block.js';
import {
  game,
  colorBoard,
  pieceColors,
} from './constants.js';

export class Piece {
    constructor(type) {
        this.dropped = false;
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
    
    setBlocks(block1, block2, block3, block4) {
        this.block1.set(block1.getX(), block1.getY());
        this.block2.set(block2.getX(), block2.getY());
        this.block3.set(block3.getX(), block3.getY());
        this.block4.set(block4.getX(), block4.getY());
    }

    getBlocks() {
        return [this.block1, this.block2, this.block3, this.block4];
    }

    setNewArr() {
        this.arr = JSON.parse(JSON.stringify(game));
    }

    ground() {
        this.checkGround();
        if (this._grounded && !this.dropped) {
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
            this.block4.testFall(this.arr) ||
            this.dropped;
        return this._grounded;
    }
    
    fall() {
        if (!this.checkGround() && !this.dropped) {
            this.clear();
            this.block1.fall();
            this.block2.fall();
            this.block3.fall();
            this.block4.fall();
            this.insert();
        }
    }
    
    rotate() {
        if (!this.checkGround() && !this.dropped) {
            if (this.checkRotate(0, 0)) {
                this.rotationHelper(0, 0);
            }
            else if (this.checkRotate(-1, 0)) {
                this.rotationHelper(-1, 0);
            }
            else if (this.checkRotate(1, 0)) {
                this.rotationHelper(1, 0);
            }
            else if (this.checkRotate(0, 1)) {
                this.rotationHelper(0, 1);
            }
            else if (this.checkRotate(-2, 0)) {
                this.rotationHelper(-2, 0);
            }
            else if (this.checkRotate(2, 0)) {
                this.rotationHelper(2, 0);
            }
            else if (this.checkRotate(0, 2)) {
                this.rotationHelper(0, 2);
            }
            else if (this.checkRotate(1, 1)) {
                this.rotationHelper(1, 1);
            }
            else if (this.checkRotate(-1, 1)) {
                this.rotationHelper(-1, 1);
            }
            else if (this.checkRotate(2, 1)) {
                this.rotationHelper(2, 1);
            }
            else if (this.checkRotate(-2, 1)) {
                this.rotationHelper(-2, 1);
            }
            else if (this.checkRotate(1, 2)) {
                this.rotationHelper(1, 2);
            }
            else if (this.checkRotate(-1, 2)) {
                this.rotationHelper(-1, 2);
            }
            else if (this.checkRotate(2, 2)) {
                this.rotationHelper(2, 2);
            }
            else if (this.checkRotate(-2, 2)) {
                this.rotationHelper(-2, 2);
            }
        }
    }
    
    checkRotate(shiftX, shiftY) {
        return this.block1.testIndex(-this.block1.getY() + this.block2.getY() + this.block2.getX() + shiftX, this.block1.getX() - this.block2.getX() + this.block2.getY() + shiftY, this.arr) &&
            this.block2.testIndex(this.block2.getX() + shiftX, this.block2.getY() + shiftY, this.arr) &&
            this.block3.testIndex(-this.block3.getY() + this.block2.getY() + this.block2.getX() + shiftX, this.block3.getX() - this.block2.getX() + this.block2.getY() + shiftY, this.arr) &&
            this.block4.testIndex(-this.block4.getY() + this.block2.getY() + this.block2.getX() + shiftX, this.block4.getX() - this.block2.getX() + this.block2.getY() + shiftY, this.arr);
    }

    rotationHelper(shiftX, shiftY) {
        this.clear();
        for (let i = 0; i < Math.abs(shiftX); i++) {
            if (shiftX < 0) {
                this.block1.shiftL();
                this.block2.shiftL();
                this.block3.shiftL();
                this.block4.shiftL();
            }
            else {
                this.block1.shiftR();
                this.block2.shiftR();
                this.block3.shiftR();
                this.block4.shiftR();
            }
        }

        for (let j = 0; j < Math.abs(shiftY); j++) {
            if (shiftY > 0) {
                fall();
            }
            else {
                return;
            }
        }
        this.block1.set(-this.block1.getY() + this.block2.getY() + this.block2.getX(), this.block1.getX() - this.block2.getX() + this.block2.getY());
        this.block3.set(-this.block3.getY() + this.block2.getY() + this.block2.getX(), this.block3.getX() - this.block2.getX() + this.block2.getY());
        this.block4.set(-this.block4.getY() + this.block2.getY() + this.block2.getX(), this.block4.getX() - this.block2.getX() + this.block2.getY());
        this.insert();
    }

    shiftR() {
        if (this.block1.canShiftR(this.arr) && this.block2.canShiftR(this.arr) && this.block3.canShiftR(this.arr) && this.block4.canShiftR(this.arr) && !this.dropped) {
            this.clear();
            this.block1.shiftR();
            this.block2.shiftR();
            this.block3.shiftR();
            this.block4.shiftR();
            this.insert();
        }
    }
    
    shiftL() {
        if (this.block1.canShiftL(this.arr) && this.block2.canShiftL(this.arr) && this.block3.canShiftL(this.arr) && this.block4.canShiftL(this.arr) && !this.dropped) {
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
        this.dropped = true;
    }
    
    insert() {
        try {
            this.arr[this.block1.getY()][this.block1.getX()] = 2;
            this.arr[this.block2.getY()][this.block2.getX()] = 2;
            this.arr[this.block3.getY()][this.block3.getX()] = 2;
            this.arr[this.block4.getY()][this.block4.getX()] = 2;
            this.colorArr[this.block1.getY()][this.block1.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block2.getY()][this.block2.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block3.getY()][this.block3.getX()] = this.pieceColors[this.type];
            this.colorArr[this.block4.getY()][this.block4.getX()] = this.pieceColors[this.type];
        } catch (e) {}
    }
    
    clear() {
        try {
            this.arr[this.block1.getY()][this.block1.getX()] = 0;
            this.arr[this.block2.getY()][this.block2.getX()] = 0;
            this.arr[this.block3.getY()][this.block3.getX()] = 0;
            this.arr[this.block4.getY()][this.block4.getX()] = 0;
            this.colorArr[this.block1.getY()][this.block1.getX()] = 'black';
            this.colorArr[this.block2.getY()][this.block2.getX()] = 'black';
            this.colorArr[this.block3.getY()][this.block3.getX()] = 'black';
            this.colorArr[this.block4.getY()][this.block4.getX()] = 'black';
        } catch (e) {}
    }
    
    getShadowCoords() {
        let tempPiece = new Piece(this.type);
        tempPiece.setNewArr();
        tempPiece.setBlocks(this.block1, this.block2, this.block3, this.block4);
        tempPiece.drop();
        let tempBlocks = tempPiece.getBlocks();
        return [tempBlocks[0].getX(), tempBlocks[0].getY() - 1, tempBlocks[1].getX(), tempBlocks[1].getY() - 1, tempBlocks[2].getX(), tempBlocks[2].getY() - 1, tempBlocks[3].getX(), tempBlocks[3].getY() - 1];
    }

    getType() {
        return this.type;
    }
    
    grounded() {
        return this._grounded;
    }
}

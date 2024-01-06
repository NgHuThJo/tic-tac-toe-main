import { Player } from "./entity/player.js";

class GameModel {
    // Player x always starts
    constructor() {
        this.playerX = new Player("Player 1", "p1");
        this.playerO = new Player("Player 2", "p2");
        this.gameBoard = new Array(9).fill("");
        this.winArray = [
            // horizontal win
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // vertical win
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // diagonal win
            [0, 4, 8], [2, 4, 6],
        ];
    }

    bindOnDisplay(callback) {
        this.display = callback; 
    }

    isEmpty(cellNumber) {
        return this.gameBoard[cellNumber] === "";
    }

    checkWin() {
        const mark = this.markArray[this.turnNumber % this.markArray.length];
        let hasWon = false;

        this.winArray.some((item) => {
            if(item.every(index => this.gameBoard[index] === mark)) {
                hasWon = true;
                
                return true;
            }
        });

        return hasWon;
    }

    checkTie() {
        return this.gameBoard.every(value => value !== "");
    }

    resetBoard() {
        this.gameBoard = this.gameBoard.map(cell => "");
        this.turnNumber = 0;

        this.display(this.gameBoard, this.markArray, this.turnNumber);
    }

    setCell(cellNumber) {
        this.gameBoard[cellNumber] = this.markArray[this.turnNumber % this.markArray.length];
    }
};

export {GameModel};
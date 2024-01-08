import { Player } from "./entity/player.js";
import { Computer } from "./entity/computer.js";

class GameModel {
    // Player X always starts
    constructor() {
        this.gameBoard = new Array(9).fill("");
        this.scoreBoard = new Array(3).fill(0);
        this.winArray = [
            // horizontal win
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // vertical win
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // diagonal win
            [0, 4, 8], [2, 4, 6],
        ];
    }
    
    bindDisplayDialog(callback) {
        this.displayDialog = callback;
    }

    bindDisplayBoard(callback) {
        this.displayBoard = callback; 
    }

    bindDisplayScoreBoard(callback) {
        this.displayScoreBoard = callback;
    }

    bindSetupScoreBoard(callback) {
        this.setupScoreBoard = callback;
    }

    createHumanPlayers(data) {
        if(data === "x") {
            this.playerArray = [
                new Player("Player 1", "P1", "x"),
                new Player("Player 2", "P2", "o"),
            ];
        } else {
            this.playerArray = [
                new Player("Player 2", "P2", "x"),
                new Player("Player 1", "P1", "o"),
            ];
        }

        this.currentPlayer = this.playerArray[0];
        this.setupScoreBoard(this.playerArray);
    }

    createComputerPlayer(data) {
        if(data === "x") {
            this.playerArray = [
                new Player("Player", "YOU", "x"),
                new Computer("Computer", "CPU", "o"),
            ];
        } else {
            this.playerArray = [
                new Player("Computer", "CPU", "x"),
                new Computer("Player", "YOU", "o"),
            ];
        }

        this.currentPlayer = this.playerArray[0];
        this.setupScoreBoard(this.playerArray);

        if(this.currentPlayer.name === "Computer") {
            this.generateMove();
        }
    }

    generateMove() {
        const randomNumber = () => Math.floor(Math.random() * this.gameBoard.length);
        let cellNumber = randomNumber();

        while(this.gameBoard[cellNumber] !== "") {
            cellNumber = randomNumber();
        }

        this.setMark(cellNumber);
        this.determineGameState();
        this.switchCurrentPlayer();
    }

    // Display method is invoked here
    switchCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerArray[0] ? this.playerArray[1] : this.playerArray[0];

        this.displayBoard(this.gameBoard, this.currentPlayer);
        this.displayScoreBoard(this.scoreBoard);

        if(this.gameBoard.some(value => value === "") && this.currentPlayer.name === "Computer") {
            this.generateMove();
        }
    }
    
    isCellEmpty(cellNumber) {
        return this.gameBoard[cellNumber] === "";
    }

    increaseScore(index) {
        this.scoreBoard[index]++;
    }

    determineGameState() {
        let message = null;

        switch(true) {
            case this.checkForWin():
                message = `${this.currentPlayer.name} wins! ${this.currentPlayer.mark} takes the round!`;
                this.increaseScore(this.currentPlayer === this.playerArray[0] ? 0 : 2);
                this.displayDialog(message);
                break;
            case this.checkForTie():
                message = "Round tied!";
                this.increaseScore(1);
                this.displayDialog(message);
                break;
        }
    }

    checkForWin() {
        const mark = this.currentPlayer.mark;
        let hasWon = false;

        this.winArray.some((item) => {
            if(item.every(index => this.gameBoard[index] === mark)) {
                hasWon = true;
                
                return true;
            }
        });

        return hasWon;
    }

    checkForTie() {
        return this.gameBoard.every(value => value !== "");
    }

    resetBoard(isQuit = false) {
        this.gameBoard = this.gameBoard.map(cell => "");
        this.currentPlayer = this.playerArray[0]; 

        this.displayBoard(this.gameBoard, this.currentPlayer, true);

        if(!isQuit && this.currentPlayer.name === "Computer") {
            this.generateMove();
        }
    }

    resetScore() {
        this.scoreBoard = Array.from(new Array(3), () => 0);

        this.displayScoreBoard(this.scoreBoard);
    }

    setMark(cellNumber) {
        this.gameBoard[cellNumber] = this.currentPlayer.mark;
    }
};

export {GameModel};
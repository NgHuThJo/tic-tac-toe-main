import { getElement, getAllElements } from "../utility/query-selector.js";

class GameView {
    constructor() {
        // Start screen
        this.startContainer = getElement(".start");
        this.startMarkButtons = getAllElements(".start__mark-buttons > *");
        this.startCpuButton = getElement(".button--cpu");
        this.startPlayerButton = getElement(".button--player");
        // Game screen
        this.gameContainer = getElement(".game");
        this.board = getElement(".game__board");
        this.boardCells = getAllElements(".board__cell");
        this.resetButton = getElement(".button--reset");
        this.nextRoundButton = getElement(".button--next-round");
        this.quitButton = getElement(".button--quit");
        this.dialog = getElement(".result");
        this.score = getAllElements(".score");
        // Miscellaneous
        this.states = new Map([
            ["start", "game"],
            ["game", "start"]
        ]);
        this.currentState = "start";
        this.setupStartMarkButtons();
    }

    setupScoreBoard(playerArray) {
        this.score.forEach((item, index) => {
            switch(index) {
                case 0:
                    item.firstElementChild.textContent = `${playerArray[0].mark.toUpperCase()} (${playerArray[0].alias})`;
                    break;
                case 2:
                    item.firstElementChild.textContent = `${playerArray[1].mark.toUpperCase()} (${playerArray[1].alias})`;
            }
        });
    }

    setupStartMarkButtons() {
        this.startMarkButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const closestButton = event.target.closest("button");

                if(closestButton.dataset.pressed === "false") {
                    const siblingButton = closestButton.nextElementSibling || closestButton.previousElementSibling;

                    closestButton.dataset.pressed = "true";
                    siblingButton.dataset.pressed = "false";
                } 
            });
        })
    }
    
    switchState() {
        getElement(`.${this.currentState}`).classList.toggle("none");
        this.currentState = this.states.get(this.currentState);
        getElement(`.${this.currentState}`).classList.toggle("none");
    }

    displayDialog(message) {
        const messageElement = document.createElement("p");
        messageElement.textContent = message.toUpperCase();
        this.dialog.firstElementChild.replaceChildren(messageElement);
        this.dialog.showModal();
    }

    displayBoard(gameBoard, currentPlayer, isReset = false) {
        const mark = currentPlayer.mark;

        if(!isReset) {
            this.gameContainer.classList.toggle("o");
        } else {
            this.gameContainer.classList.remove("o");
        }

        gameBoard.forEach((item, index) => {
            this.boardCells[index].className = `board__cell${item && ` ${item}`}`;
        });
    }

    displayScoreBoard(scoreBoard) {
        this.score.forEach((element, index) => {
            element.lastElementChild.textContent = scoreBoard[index];
        })
    }

    onStartPlayer(handler) {
        this.startPlayerButton.addEventListener("click", () => {
            let playerMark = null;

            this.startMarkButtons.forEach((button) => {
                if(button.dataset.pressed === "true") {
                    playerMark = button.dataset.mark;
                }
            })

            handler(playerMark);
            this.switchState();
        });
    }

    onComputerPlayer(handler) {
        this.startCpuButton.addEventListener("click", () => {
            let playerMark = null;

            this.startMarkButtons.forEach((button) => {
                if(button.dataset.pressed === "true") {
                    playerMark = button.dataset.mark;
                }
            })

            handler(playerMark);
            this.switchState();
        });
    }

    onSetMark(handler) {
        this.board.addEventListener("click", event => {
            if(event.target.classList.contains("board__cell")) {
                handler(event.target.dataset.id);
            }
        });
    }

    onReset(handler) {
        this.resetButton.addEventListener("click", () => {
            handler();
        });
    }

    onNextRound(handler) {
        this.nextRoundButton.addEventListener("click", () => {
            this.dialog.close();
            handler();
        })
    }

    onQuitGame(handler) {
        this.quitButton.addEventListener("click", () => {
            handler(true);
            this.dialog.close();
            this.switchState();
        });
    }
};

export {GameView};
import { getElement, getAllElements } from "../utility/query-selector.js";

class GameView {
    constructor() {
        this.gameContainer = getElement(".game");
        this.board = getElement(".game__board");
        this.cells = getAllElements(".board__cell");
        this.reset = getElement(".button--reset");
    }

    display(gameboard, markArray, turnNumber) {
        const nextTurnMark = markArray[turnNumber % 2];
        this.gameContainer.className = "game" + (" " + nextTurnMark);

        gameboard.forEach((item, index) => {
            this.cells[index].className = "board__cell" + (" " + item || "");
        });
    }

    onTurn(handler) {
        this.board.addEventListener("click", event => {
            if(event.target.classList.contains("board__cell")) {
                handler(event.target.dataset.id);
            }
        });
    }

    onReset(handler) {
        this.reset.addEventListener("click", () => {
            handler();
        });
    }
};

export {GameView};
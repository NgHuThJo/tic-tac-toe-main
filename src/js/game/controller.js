class GameController {
    constructor(model, view) {
        this.model = model;
        this.model.bindOnDisplay(this.handleDisplay);
        this.view = view;
        this.view.onReset(this.handleReset);
        this.view.onTurn(this.handleTurn);
    }

    handleDisplay = (gameboard, markArray, turnNumber) => {
        this.view.display(gameboard, markArray, turnNumber);
    }

    handleTurn = (cellNumber) => {
        if(this.model.isEmpty(cellNumber)) {
            this.model.setCell(cellNumber);

            switch(true) {
                case this.model.checkWin():
                    this.model.win();
                    console.log("Win");
                    break;
                case this.model.checkTie():
                    this.model.tie();
                    console.log("Tie");
                    break;
            }

            this.model.increaseTurnNumber();
        }
    }

    handleReset = () => {
        this.model.resetBoard();
    }
};

export {GameController};
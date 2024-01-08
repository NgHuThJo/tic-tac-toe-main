class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.bindDisplayBoard(this.handleDisplayBoard);
        this.model.bindDisplayDialog(this.handleDisplayDialog);
        this.model.bindDisplayScoreBoard(this.handleDisplayScoreBoard);
        this.model.bindSetupScoreBoard(this.handleSetupScoreBoard);
        this.view.onReset(this.handleReset);
        this.view.onSetMark(this.handleSetMark);
        this.view.onNextRound(this.handleNextRound);
        this.view.onStartPlayer(this.handlePlayerStart);
        this.view.onComputerPlayer(this.handleComputerStart);
        this.view.onQuitGame(this.handleQuitGame);
    }

    handlePlayerStart = (playerMark) => {
        this.model.createHumanPlayers(playerMark);
    }

    handleComputerStart = (playerMark) => {
        this.model.createComputerPlayer(playerMark);
    }

    handleSetupScoreBoard = (playerArray) => {
        this.view.setupScoreBoard(playerArray);
    }
    
    handleDisplayDialog = (message) => {
        this.view.displayDialog(message);
    }

    handleDisplayBoard = (gameBoard, currentPlayer, isReset) => {
        this.view.displayBoard(gameBoard, currentPlayer, isReset);
    }

    handleDisplayScoreBoard = (scoreBoard) => {
        this.view.displayScoreBoard(scoreBoard);
    }

    handleSetMark = (cellNumber) => {
        if(this.model.isCellEmpty(cellNumber)) {
            this.model.setMark(cellNumber);
            this.model.determineGameState();
            this.model.switchCurrentPlayer();
        }
    }

    handleReset = () => {
        this.model.resetBoard();
    }

    handleNextRound = () => {
        this.model.resetBoard();
    }

    handleQuitGame = (isQuit) => {
        this.model.resetBoard(isQuit);
        this.model.resetScore();
    }
};

export {GameController};
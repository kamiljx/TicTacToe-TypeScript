var btnPlay = document.querySelector('.btnPlay');
var btnRestart = document.querySelector('.btnRestart');
var Board = /** @class */ (function () {
    function Board(x, y) {
        if (x === void 0) { x = 3; }
        if (y === void 0) { y = 3; }
        this._cells = [];
        this._gameBody = document.querySelector('.game');
        this._gameBody.innerHTML = '';
        this._nextAction = 'cross';
        this._cellsAmount = 0;
        this._cols = x;
        this._rows = y;
        this._gameStarted = true;
        for (var i = 0; i < x; i++) {
            this._cells[i] = [];
            for (var j = 0; j < y; j++) {
                this._cells[i][j] = new Cell(this);
                this._cellsAmount++;
            }
        }
        this._restartButton = this.createRestartButton();
        this._popup = this.createPopup();
    }
    Object.defineProperty(Board.prototype, "nextAction", {
        get: function () {
            return this._nextAction;
        },
        set: function (value) {
            this._nextAction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "gameStarted", {
        get: function () {
            return this._gameStarted;
        },
        enumerable: true,
        configurable: true
    });
    Board.prototype.resetGame = function (that) {
        that = new Board(that._cols, that._rows);
        that.create();
    };
    Board.prototype.createRestartButton = function () {
        var _this = this;
        var element = document.createElement('button');
        element.classList.add("btnRestart");
        element.textContent = "Restart";
        this._gameBody.appendChild(element);
        element.addEventListener('click', function () { return _this.handleRestartButton(_this); });
        return element;
    };
    Board.prototype.showRestartButton = function () {
        this._restartButton.classList.add('visible');
    };
    Board.prototype.hideRestartButton = function () {
        this._restartButton.classList.remove('visible');
    };
    Board.prototype.handleRestartButton = function (that) {
        that.hideRestartButton();
        that.hidePopup();
        that.resetGame(that);
    };
    Board.prototype.createPopup = function () {
        var element = document.createElement('div');
        element.classList.add("popupStyle");
        this._gameBody.appendChild(element);
        return element;
    };
    Board.prototype.showPopup = function (titleValue) {
        var title = document.createElement('h2');
        title.innerText = titleValue;
        this._popup.appendChild(title);
        this._popup.classList.add('visible');
        this._gameStarted = false;
        this.showRestartButton();
    };
    Board.prototype.hidePopup = function () {
        this._popup.innerHTML = "";
        this._popup.classList.remove('visible');
    };
    Board.prototype.decreaseCellsAmount = function () {
        this._cellsAmount--;
    };
    Board.prototype.checkWinSituation = function () {
        var result;
        result = this.checkRows() || this.checkCols() || this.checkMainDiagonal() || this.checkAntiDiagonal();
        if (result !== '')
            result += ' won!';
        if (result === '' && this._cellsAmount === 0)
            result = 'draw';
        if (result !== '')
            this.showPopup(result);
    };
    Board.prototype.checkRows = function () {
        for (var i = 0; i < this._rows; i++) {
            var result = void 0;
            var firstCell = this._cells[i][0].value || "";
            for (var j = 0; j < this._cols; j++) {
                result = this._cells[i][j].value === firstCell;
                if (!result)
                    break;
            }
            if (result)
                return firstCell;
        }
        return "";
    };
    Board.prototype.checkCols = function () {
        for (var i = 0; i < this._cols; i++) {
            var result = void 0;
            var firstCell = this._cells[0][i].value || "";
            for (var j = 0; j < this._rows; j++) {
                result = this._cells[j][i].value === firstCell;
                if (!result)
                    break;
            }
            if (result)
                return firstCell;
        }
        return "";
    };
    Board.prototype.checkMainDiagonal = function () {
        var result;
        var firstCell = this._cells[0][0].value || "";
        for (var i = 0; i < this._cols; i++) {
            result = this._cells[i][i].value === firstCell;
            if (!result)
                return "";
        }
        return firstCell;
    };
    Board.prototype.checkAntiDiagonal = function () {
        var result;
        var firstCell = this._cells[0][this._rows - 1].value || "";
        for (var i = 0; i < this._cols; i++) {
            result = this._cells[i][this._rows - 1 - i].value === firstCell;
            if (!result)
                return "";
        }
        return firstCell;
    };
    Board.prototype.changeNextAction = function () {
        if (this.nextAction === 'cross')
            this.nextAction = 'nought';
        else
            this.nextAction = 'cross';
    };
    Board.prototype.create = function () {
        var board = document.createElement('div');
        board.classList.add('board');
        for (var i = 0; i < this._cells.length; i++) {
            for (var j = 0; j < this._cells[i].length; j++) {
                board.appendChild(this._cells[i][j].DOMElement);
            }
        }
        this._gameBody.appendChild(board);
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(board) {
        this._board = board;
        this._DOMElement = this.createElement();
        this.addListener(this._DOMElement, 'click', this.handleClick);
    }
    Cell.prototype.createElement = function () {
        var element = document.createElement('div');
        element.classList.add('cell');
        return element;
    };
    Cell.prototype.addListener = function (element, event, callback) {
        var _this = this;
        element.addEventListener(event, function () { return callback(_this); });
    };
    Cell.prototype.handleClick = function (that) {
        if (that.isFilled() || that._board.gameStarted === false)
            return;
        var action = that._board.nextAction;
        if (action === "cross") {
            that.DOMElement.classList.add('fas');
            that.DOMElement.classList.add('fa-times');
        }
        else if (action === "nought") {
            that.DOMElement.classList.add('far');
            that.DOMElement.classList.add('fa-circle');
        }
        that.value = action;
        that._board.changeNextAction();
        that._board.decreaseCellsAmount();
        that._board.checkWinSituation();
    };
    Cell.prototype.isFilled = function () {
        return this.value !== undefined;
    };
    Object.defineProperty(Cell.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "DOMElement", {
        get: function () {
            return this._DOMElement;
        },
        enumerable: true,
        configurable: true
    });
    return Cell;
}());
var newBoard = new Board();
newBoard.create();
var handleClickPlay = function () {
    btnPlay.classList.add('btnPlay-displayblock');
    btnRestart.classList.remove('btnRestart-displayblock');
};
var handleClickreStart = function () {
    btnPlay.classList.remove('btnPlay-displayblock');
    btnRestart.classList.add('btnRestart-displayblock');
};

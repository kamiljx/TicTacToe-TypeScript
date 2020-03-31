var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.nextPlayer = function (activePlayer) {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        };
        this.game = function () {
            var clicked = document.getElementById(_this.id);
        };
        this.board = [2, 2, 2, 2, 2, 2, 2, 2, 2];
        // const enum Player{
        //     None = 0,
        //     One = 1,
        //     Two = 2
        //     }
        this.activePlayer = [1, 2];
        this.col1 = document.getElementById('col1');
    }
    return Board;
}());

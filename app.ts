class Board {
    board: number[];
    Player: [];
    activePlayer: number []
    col1: HTMLElement
    col2: HTMLElement
    col3: HTMLElement
    col4: HTMLElement
    col5: HTMLElement
    col6: HTMLElement
    col7: HTMLElement
    col8: HTMLElement
    col9: HTMLElement
    
    constructor() {
        this.board =[2,2,2,2,2,2,2,2,2];
        // const enum Player{
        //     None = 0,
        //     One = 1,
        //     Two = 2
        //     }
        this.activePlayer = [1,2]
        this.col1 = document.getElementById('col1')
    }
    nextPlayer =(activePlayer: number) => {
       activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
    game = () => {
        document.getElementsByClassName('.klasa').addListener("click", function(){
            
          });
    }
}

        


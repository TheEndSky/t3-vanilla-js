import Store from './store.js';
import View from './view.js'

const player = [
    {
        id:1,
        name:'Player 1',
        iconClass:'fa-x',
        colorClass:'turquoise'
    },
    {
        id:2,
        name:'Player 2',
        iconClass:'fa-o',
        colorClass:'yellow'
    }
]

function init() {
    const view = new View();
    const store = new Store('live-t3-storage-key',player);

    function initView() {
        view.closeAll();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPLayer);
        view.updateScoreBoard(
            store.stats.playerWithStats[0].wins,
            store.stats.playerWithStats[1].wins,
            store.stats.ties
            );
        view.initializeMoves(store.game.moves);
    }

    window.addEventListener('storage',() => {
        console.log('State Changed from another tab')
        // Initialize the view when storage changes
        initView()
    })
    // Initialize view on page load
    initView();
    

    view.bindGameResetEvent(event => {
        store.reset();
        initView()
        // view.setTurnIndicator(players[0])
        

        
    })

    view.bindNewRoundEvent(event => {
        store.newRound();
        
        initView()

    })

    view.bindPlayerMoveEvent((square) => {

        

        const existingMove = store.game.moves.find(move => move.squareId === +square.id)

        if (existingMove) {
            return
        }
        //this store.game.currentPLayer is different to
        //Place an icon of the current player in a square
        view.handlePlayerMove(square,store.game.currentPLayer)
        //Because there's a state change happen between the two

        //Advance to the next state by pushing a move to the moves array
        store.playerMove(+square.id)
        
        if(store.game.status.isComplete) {
            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins!` : 'Tie');
            //If complete return and dont run any code blow this
            return 
        }
        //this other store.game.currentPLayer
        //Set the next player's turn indicator
        view.setTurnIndicator(store.game.currentPLayer);
        
    })

    console.log(view.$)
    console.log(view.$$)

    // console.log(view.$.turn)
    
    
}

window.addEventListener('load',init)
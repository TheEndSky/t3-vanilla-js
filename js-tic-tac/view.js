//Object oriented Programming
// export class View If you export a variable without the default keyword you need to Import it in the Module JS file with curly brackets { View }

// In view only view-oriented lines of code are meant to be in here, nothing that would change the state of the code
export default class View {

    $ = {}
    $$ = {}

    //Attach a bunch of constructed Individual elements into '$'
    constructor () {
        this.$.menu= this.#qs('[data-id="menu"]');
        this.$.menuBtn= this.#qs('[data-id="menu-btn"]');
        this.$.menuItems= this.#qs('[data-id="menu-items"]');
        this.$.resetBtn= this.#qs('[data-id="reset-btn"]');
        this.$.newRoundBtn= this.#qs('[data-id="new-round-btn"]');
        this.$.modal= this.#qs('[data-id="modal"');
        this.$.modalText= this.#qs('[data-id="modal-text"]');
        this.$.modalButton= this.#qs('[data-id="modal-button"]');
        this.$.turn= this.#qs('[data-id="turn"]');
        this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
        this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
        this.$.ties = this.#qs('[data-id="ties"]');
        
        //Attach a Node list into $$
        this.$$.squares= this.#qsAll('[data-id="square"]');

        //UI only event listeners
        this.$.menuBtn.addEventListener('click',(event) => {
            this.#toggleMenu()
        })
        
        
    }
        // We dont wanna do everything at once in view.js so we pass a handler as an argument, that's gonna let everything to be taken care of in our app.js file

        /*Register All event Listeners */
    bindGameResetEvent(handler) {
        this.$.resetBtn.addEventListener('click',handler)
        this.$.modalButton.addEventListener('click',handler)
    }

    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener('click',handler)
    }
    bindPlayerMoveEvent(handler) {
        this.$$.squares.forEach(square => {
            square.addEventListener('click',() =>handler(square));
        });
    }

    updateScoreBoard(p1Wins,p2Wins,ties){
        this.$.p1Wins.innerText = `${p1Wins} wins`
        this.$.p2Wins.innerText = `${p2Wins} wins`
        this.$.ties.innerText = `${ties}`
    }
    openModal(message) {
        this.$.modal.classList.remove('hidden')
        this.$.modalText.innerText = message
    }
    #closeModal() {
        this.$.modal.classList.add('hidden')
    }
    #closeMenu() {
        this.$.menuItems.classList.add('hidden');
        this.$.menuBtn.classList.remove('border');

        const icon = this.$.menuBtn.querySelector('i')
        icon.classList.add('fa-chevron-down')
        icon.classList.remove('fa-chevron-up')
    }
    closeAll() {
        this.#closeModal();
        this.#closeMenu();

    }
    clearMoves() {
        this.$$.squares.forEach(square => {
            square.replaceChildren()
        })
    }
    initializeMoves(moves) {
        this.$$.squares.forEach(square => {
            const existingMove = moves.find(move => move.squareId === +square.id)
            
            if(existingMove) {
                this.handlePlayerMove(square,existingMove.player)
            }
        })
    }
    /*DOM Helper Methods */
    #toggleMenu() {
        this.$.menuItems.classList.toggle('hidden');
        this.$.menuBtn.classList.toggle('border');

        //Flip the icon up and down
        const icon = this.$.menuBtn.querySelector('i')  //Grab the first icon inside menuBtn
        
        icon.classList.toggle('fa-chevron-down')
        icon.classList.toggle('fa-chevron-up')
    }
    handlePlayerMove(squareEl,player){
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', player.iconClass, player.colorClass )
        squareEl.replaceChildren(icon)
    }
    
    setTurnIndicator(player,opponent) {
        // Since we dont have the context of what player has made the move yet we'll hardcode it first and change it into something more dynamic later
        const icon = document.createElement('i')
        const label = document.createElement('p')

        icon.classList.add('fa-solid',player.colorClass, player.iconClass);
         // icon.classList.add("fa-solid", player === 1 ? 'fa-x': 'fa-o');

        label.classList.add(player.colorClass);

    
        label.innerText = `${player.name}, you're up!`

        this.$.turn.replaceChildren(icon,label)
        
    }
    //We're using alot of markup with our constructor() method, and we're not entirely certain we are actually grabbing an element. In summary we're repeating the same syntax over and over and cant guarantee we're grabbing an element. So lets create a helper method for it

    //You can make a method private by putting a hasthag before the function
    #qs(selector,parent) {
        const el = parent 
        ? parent.querySelector(selector) 
        : document.querySelector(selector);
        //If the selector is not found we throw a new Error
        if(!el) throw new Error('Could not find elements')

        return el
    }
    #qsAll(selector) {
        const elList=  document.querySelectorAll(selector);
        //If the selector is not found we throw a new Error
        if(!elList) throw new Error('Could not find elements')

        return elList
    }
}

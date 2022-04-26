export default class Game {
    public players: string[] = [];
    public playedCard: string[] = [];
    public stack: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('diamonds_' + i);
        }
        shuffle(this.stack);
    }

    
    public ConvertToJson(){
        return {
         players: this.players,
         playedCard: this.playedCard,
         stack: this.stack,
         currentPlayer: this.currentPlayer
        }
    }

}

// to shuffel or mix the (Array)cards 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//error TS7006: Parameter 'array' implicitly has an 'any' type. then strict mode should be on false and noima.. false too.
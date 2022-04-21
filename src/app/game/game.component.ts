import { Component, OnInit } from '@angular/core';
import Game from '../module/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimtation = false;
  game: Game | undefined;
  currentCard: string = '';

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
  takeCard() {
    if (!this.pickCardAnimtation) {

      //pop() show and delete last value from Array 
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimtation = true;
      console.log(this.currentCard);


    }
    setTimeout(() => {
      this.pickCardAnimtation = false;

    }, 1500);
  }
}

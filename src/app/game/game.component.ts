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
  constructor() { }

  ngOnInit(): void {
 this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
  takeCard() {
    this.pickCardAnimtation = true;
  }
}

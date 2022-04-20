import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimtation = false;
  constructor() { }

  ngOnInit(): void {
  }
takeCard(){
  this.pickCardAnimtation = true;
  console.log(this.pickCardAnimtation)
}
}

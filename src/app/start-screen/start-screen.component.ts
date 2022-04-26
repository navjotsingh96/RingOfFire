import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GameInfoComponent } from '../game-info/game-info.component';
import Game from '../module/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
  newGame() {
    //Start new Game
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.ConvertToJson())
      // wie subscribe arber wird nur einmal abgerufen
      .then((gameInfo: any) => {
        // to genrate immer ein andere url für neu Game
        this.router.navigateByUrl('/game/' + gameInfo['id']);

      })
      ;
  }
}

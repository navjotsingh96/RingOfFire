import { Component, OnInit } from '@angular/core';
import Game from '../module/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPalyerComponent } from '../dialog-add-palyer/dialog-add-palyer.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimtation = false;
  game: Game | undefined;
  currentCard: string = '';
  game$;


  constructor(private firestore: Firestore, public dialog: MatDialog) {

    const coll = collection(firestore, 'games');
    this.game$ = collectionData(coll);
    this.game$.subscribe((game) => {
    
      console.log('new from Firebase', game);

    });
  }

  ngOnInit(): void {
    this.newGame();

    /*  this.firestore.collection('games').valueChanges().subscribe((game) => {
       console.log('new from Firebase', game)
     });
      */
  }

  newGame() {
    this.game = new Game();
  }
  takeCard() {
    if (!this.pickCardAnimtation) {

      //pop() show and delete last value from Array 
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimtation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    }
    setTimeout(() => {
      this.game.playedCard.push(this.currentCard);

      this.pickCardAnimtation = false;

    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPalyerComponent, {

    });
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

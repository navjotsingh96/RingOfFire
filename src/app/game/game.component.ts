import { Component, OnInit } from '@angular/core';
import Game from '../module/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPalyerComponent } from '../dialog-add-palyer/dialog-add-palyer.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { doc, setDoc } from 'firebase/firestore';

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
    // mit coll griefen wir collection games in firestone an. ('games') ist der name der Collection in Firebase
    const coll = collection(firestore, 'games');

    // mit collectiondata greifen wir was den erstellete document von den collection(coll) an.
    this.game$ = collectionData(coll);

    // mit subscribe werden die Daten sofort angezeigt, wenn iregenwas in firebase updated oder geändert wurde.
    this.game$.subscribe((game) => {

      console.log('new from Firebase', game);

    });
  }

  ngOnInit(): void {
    this.newGame();
    this.updateToFirebase();
  }

  updateToFirebase() {
    // mit coll griefen wir collection games in firestone an. ('games') ist der name der Collection in Firebase
    const coll = collection(this.firestore, 'games');

    // setDoc to setdocument in der documnet von collection dann was wir hochladen wollen

    setDoc(doc(coll), { 'HALLO': 'Welt' })
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

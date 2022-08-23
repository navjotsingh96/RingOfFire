import { Component, OnInit } from '@angular/core';
import Game from '../module/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPalyerComponent } from '../dialog-add-palyer/dialog-add-palyer.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game | undefined;
  gameId: string;
  play;
  gameOver = false;
  value = window.location.href;
  player:boolean = false;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          /*    console.log('game update', game['players'].length -1 );
             this.play= game['players'];
             console.log(this.play.slice(-1)[0]);
             alert(this.play.slice(-1)[0] + ' had joined game'); */

          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimtation = game.pickCardAnimtation;


        });
    });


  }

  newGame() {
    this.game = new Game();
  }

  checkPlayer(){
    if(this.game.players.length < 1){
      this.player = false;
    } else{
      this.player = true;
    }
  }
  takeCard() {
    this.checkPlayer();
    if(this.player){
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimtation) {

      //pop() show and delete last value from Array 
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimtation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
    }
    setTimeout(() => {
      this.game.playedCard.push(this.game.currentCard);
      this.game.pickCardAnimtation = false;
      this.saveGame();

    }, 1000);
  } else{
    alert('Please add Player')
  }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPalyerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }

  // to save the game data 
  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.ConvertToJson());
  }

  editPlayer(Playerid: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(Playerid, 1);
          this.game.player_images.splice(Playerid, 1);
        } else {
          this.game.player_images[Playerid] = change;
        }

      }
      this.saveGame();
    });
  }
  openSnackBar(msg) {
    this._snackBar.open(msg);

    setTimeout(() => {
    this._snackBar.dismiss();
      
    }, 3000);
  }
}

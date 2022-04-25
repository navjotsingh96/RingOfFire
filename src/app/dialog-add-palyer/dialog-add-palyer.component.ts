import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-palyer',
  templateUrl: './dialog-add-palyer.component.html',
  styleUrls: ['./dialog-add-palyer.component.scss']
})
export class DialogAddPalyerComponent implements OnInit {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<DialogAddPalyerComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

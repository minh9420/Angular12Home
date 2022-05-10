import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-addexp',
  templateUrl: './addexp.component.html',
  styleUrls: ['./addexp.component.scss']
})
export class AddexpComponent implements OnInit {
  addeditcode: string = '';
  addeditname: string = '';
  constructor(
    private dialogRef: MatDialogRef<HomeComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

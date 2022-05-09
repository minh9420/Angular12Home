import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
import { AddexpComponent } from '../addexp/addexp.component';
import { HttpServerService } from '../Services/http-server.service';
import { HomeComponent } from './../home/home.component';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  constructor(private httpServerService: HttpServerService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<HomeComponent>,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  public abc:any;
  addDelete():void {
    this.httpServerService.deleteComment(this.data.pro).subscribe((data => {
      // this.abc = this.data.meth   
      // console.log(this.abc)
      this.dialogRef.close();
      // if(data) {
      //   this.abc;
      // }
  }))
}

  editsv():void {
    this.httpServerService.editComment(this.data.pro.id, this.abc).subscribe((data => {
      console.log('nnono')
      this.abc = data;
      if(this.abc) {
        this.data.meth
      }
  }))
  };

  addEdit():void {
    const dialogRef = this.dialog.open(AddexpComponent, {
      width: '1050px',
      // data: {addcode: this.addcode, addname: this.addname},
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.abc = result;
      if (this.abc) {this.editsv()}
    });
  };
}


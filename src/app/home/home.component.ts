import { ExampleComponent } from './../example/example.component';
import { AboutComponent } from './../about/about.component';
import { HttpServerService } from './../Services/http-server.service';
import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { style } from '@angular/animations';

export interface PeriodicElement {
  tenKhoa: string;
  maKhoa: string;
  symbol: any;
}

// addnamecode
export interface DialogData {
  addcode: string;
  addname: string;
}
// export interface DialogData {
//   animal: 'panda' | 'unicorn' | 'lion';
// }
const ELEMENT_DATA: PeriodicElement[] = [{
  maKhoa: '', tenKhoa: '', symbol:'' 
}];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // public addcode: string = '';
  // public addname: string = '';
  public post: object = {};
  public postAdd: object = {};
  public delAdd: any =  '';
  
  public displayedColumns: string[] = ['maKhoa', 'tenKhoa', 'symbol'];
  public dataSource = ELEMENT_DATA;
  // public dataday: any = '';
  // faCoffee = faCoffee;

  constructor(
    private httpServerService: HttpServerService, 
    public dialog: MatDialog,
    ) { }

  public ngOnInit(): void {
    this.getsv()
  }


  getsv() :void  {
    this.httpServerService.getComment().subscribe((data => {
      this.dataSource = data
 
      console.log(this.delAdd)
      console.log(data)
    }))
  }

  postsv() :void  {
    this.httpServerService.postComment(this.post).subscribe((data => {
      // this.postAdd = data
      console.log(data);
      
      if(data) {
        // console.log('haha')
        this.getsv();
     }
    }))
  }

  // deletesv() :void  {
  //   this.httpServerService.deleteComment(this.dataSource).subscribe((data => {
  //   }))
  // }

  openAddEdit(element:any):void {
    console.log(element.id);
    
    const dialogRef = this.dialog.open(ExampleComponent, {
      panelClass: 'custom-dialog-container',
      data: {pro: element, meth: this.getsv, open: this.openDialog, post: this.postsv}
    });
  }


  // addDelete(event:any):void {
  //   // const dataDel = event.target
  //   console.log('event.target') 
  // };

  
  openDialog():void {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '1050px',
      // data: {addcode: this.addcode, addname: this.addname},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.post = result;
      if (this.post) {this.postsv()}
      console.log(this.post)
    });
  }

  
 
}

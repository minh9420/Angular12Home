// import { ExampleComponent } from './../example/example.component';
import { AboutComponent } from './../about/about.component';
import { HttpServerService } from './../Services/http-server.service';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { style } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



// addnamecode
export interface DialogData {
  addcode: string;
  addname: string;
}




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public post: object = {};
  public postAdd: object = {};
  public delAdd: string =  '';
  
  public displayedColumns: string[] = ['maKhoa', 'tenKhoa', 'symbol'];
  public dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private httpServerService: HttpServerService, 
    public dialog: MatDialog,
    ) { }

  public ngOnInit(): void {
    this.getsv()
  }
  
  
  getsv() :void  {
    this.httpServerService.getComment().subscribe((data => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(data)
      this.dataSource.paginator = this.paginator;
      
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

  editsv(e: any):void {
    this.httpServerService.editComment(e.id, this.post).subscribe((data => {
      console.log('nnono')
      this.post = data;
      if(this.post) {
        this.getsv()
      }
  }))
  };

  editNew(element: any):void {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '1050px',
      data: element,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.post = result;
      console.log(this.post)
      if (this.post) {
        this.editsv(element)
      }
    });
  }

  deletesv(e: any) :void  {
    this.httpServerService.deleteComment(e.id).subscribe((data => {
      if(confirm('xoa thiet hom')) {
        this.getsv()
      }
    }))
  }
  

  
  openDialog():void {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '1050px',
      // data: {addcode: this.addcode, addname: this.addname},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.post = result;
      if (this.post) {
        this.postsv()}
      console.log(this.post)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
 
export interface PeriodicElement {
  tenKhoa: string;
  maKhoa: string;
  symbol: any;
}

const ELEMENT_DATA: PeriodicElement[] = [{
  maKhoa: '', tenKhoa: '', symbol:'' 
}];
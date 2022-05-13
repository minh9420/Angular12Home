import { HomeComponent } from './../home/home.component';
// import { ExampleComponent } from './../example/example.component';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<HomeComponent>,
  private fb: FormBuilder) { }

public dp = 'none';
  public nameMajor:string = 'Them moi';
  // public datated: any = this.data;
  public profileForm = this.fb.group(
    {
    tenKhoa: ['', Validators.required],
    maKhoa: ['', Validators.required],
  }
  );


  onSubmit() {
    console.warn(this.profileForm.value);
    // this.onNoClick()
  }
  
  ngOnInit(): void {
    this.changeName()
  }
  changeName() {
    if(this.data) {
      this.nameMajor = "sua danh sach khoa"
       this.profileForm = this.fb.group(
        {
        tenKhoa: [this.data.tenKhoa, Validators.required],
        maKhoa: [this.data.maKhoa, Validators.required],
      }
      );
    }
}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(event:Event){
    console.log(this.profileForm.value)
    this.dp = 'block';
    if(this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value)
    }
  }
}

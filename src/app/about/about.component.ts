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

  public datated: any = this.data;
  public profileForm = this.fb.group(
    {
    tenKhoa: ['', Validators.required],
    maKhoa: ['', Validators.required],
  }
  );
  public editForm = this.fb.group(
    {
    tenKhoa: [this.datated.tenKhoa, Validators.required],
    maKhoa: [this.datated.maKhoa, Validators.required],
  }
  );

  onSubmit() {
    console.warn(this.profileForm.value);
    // this.onNoClick()
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // abc() {
  //   if (this.profileForm.invalid) {
  //     console.warn(this.profileForm.value);
  //     this.profileForm.get('tenKhoa')?.markAsTouched();
  //     this.profileForm.get('maKhoa')?.markAsTouched();
  //     return
  //    } else  {
  //      console.log(this.profileForm.value)
  //      return this.profileForm.value
  //    }
  //    this.dialogRef.close();
  //   }  
}

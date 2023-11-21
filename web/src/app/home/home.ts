import { Component, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  title = 'Home';
  file!: File;
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog!: ElementRef;
  loading = false;

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {}

  OpenAddFilesDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }

  // On file Select 
  onChange(event: any) {
    if (event.target.files[0].type != 'video/mp4') {
      this.dialog.open(ErrorDialog);
      return;
    }

    this.file = event.target.files[0];
    this.loading = true;

    const formData = new FormData();
    formData.append('videoUpload', this.file, this.file.name);

    fetch('http://localhost:3000/video', {
      method: 'POST',
      body: formData
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      this.loading = false;
      this.router.navigateByUrl('/video/' + data.url);
    }).catch((err) => { 
      console.log(err)
      this.loading = false;
    });
  }

  onUpload() {
    // this.loading = !this.loading; 
    // console.log(this.file); 
    // this.fileUploadService.upload(this.file).subscribe( 
    //     (event: any) => { 
    //         if (typeof (event) === 'object') { 

    //             // Short link via api response 
    //             this.shortLink = event.link; 

    //             this.loading = false; // Flag variable  
    //         } 
    //     } 
    // ); 
  }
}

@Component({
  selector: 'error-dialog',
  templateUrl: './dialog.html',
})
export class ErrorDialog {
  constructor(public dialogRef: MatDialogRef<ErrorDialog>) {}

  close(): void {
    this.dialogRef.close();
  }
}
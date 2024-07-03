import { Component,OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DocumentService } from '../../../_services/document.service';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrl: './upload-doc.component.css'
})
export class UploadDocComponent implements OnInit {
  uploadedFiles: any[] = [];
  fileUrl: SafeUrl | null = null;
  fileType: string | null = null;
  
  constructor(private documentService:DocumentService, private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {}
  
  onFileSelect(event: any) {
    this.uploadedFiles = event.files;
  }
  
  async upload() {        
    const formData: FormData = new FormData();
    formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
    formData.append('clientId', '66736be50b08eb4fb7fd2e51');
    (await this.documentService.uploadFile(formData)).subscribe({
      next: (response: any) => {
        console.log('File uploaded successfully', response);
        const fileId = response.fileId;
        this.documentService.getviewLink(fileId);
      },
      error: (err) => {
        console.error('Error uploading file', err);
      },
      complete: () => {
        console.log('Upload complete');
      }
    });
  }
  

  async viewFile(fileId: string) {
    this.documentService.viewFile(fileId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.fileType = response.type;
      },
      error: (error) => {
        console.error('Error fetching file', error);
      }
    });
  }
  
}













// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// declare const gapi: any;

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.css'],

// })
// export class UploadComponent implements OnInit {
//   uploadedFiles: any[] = [];
//   developerKey: string = 'YOUR_DEVELOPER_KEY';
//   clientId: string = 'YOUR_CLIENT_ID';
//   scope: string[] = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly'];
//   pickerApiLoaded: boolean = false;
//   oauthToken: string | undefined;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.loadGooglePicker();
//   }

//   onUpload(event: any) {
//     for (let file of event.files) {
//       this.uploadedFiles.push(file);
//     }
//   }

//   uploadFile(event: any) {
//     const formData: FormData = new FormData();
//     formData.append('file', event.files[0], event.files[0].name);
//     formData.append('clientName', 'clientName');
//     formData.append('userEmail', 'user@example.com');

//     this.http.post('http://localhost:3000/upload', formData).subscribe(response => {
//       console.log('File uploaded successfully', response);
//     }, error => {
//       console.error('Error uploading file', error);
//     });
//   }

//   loadGooglePicker() {
//     gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
//     gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
//   }

//   onAuthApiLoad() {
//     gapi.auth.authorize({
//       client_id: this.clientId,
//       scope: this.scope,
//       immediate: false
//     }, this.handleAuthResult.bind(this));
//   }

//   onPickerApiLoad() {
//     this.pickerApiLoaded = true;
//   }

//   handleAuthResult(authResult: any) {
//     if (authResult && !authResult.error) {
//       this.oauthToken = authResult.access_token;
//       this.createPicker();
//     }
//   }

//   createPicker() {
//     if (this.pickerApiLoaded && this.oauthToken) {
//       const picker = new google.picker.PickerBuilder()
//         .addView(google.picker.ViewId.DOCS)
//         .setOAuthToken(this.oauthToken)
//         .setDeveloperKey(this.developerKey)
//         .setCallback(this.pickerCallback.bind(this))
//         .build();
//       picker.setVisible(true);
//     }
//   }

//   pickerCallback(data: any) {
//     if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
//       const fileId = data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];
//       console.log('The user selected: ' + fileId);
//       this.http.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
//         headers: {
//           'Authorization': `Bearer ${this.oauthToken}`
//         },
//         responseType: 'blob'
//       }).subscribe(response => {
//         const blob = new Blob([response], { type: 'application/octet-stream' });
//         const file = new File([blob], 'downloaded-file', { type: 'application/octet-stream' });
//         this.uploadFile({ files: [file] });
//       });
//     }
//   }

//   triggerPicker() {
//     this.loadGooglePicker();
//   }
// }

// file-upload.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HashPasswordService } from '../_services/hash-password.service';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-login',
  // standalone:true,
  // imports:[CommonModule, ReactiveFormsModule, BrowserModule,
  //   BrowserModule,
  //   BrowserAnimationsModule,
  //   AppRoutingModule,
  //   FormsModule,
  //   HttpClientModule,
  //   CardModule,
  //   ButtonModule,
  //   ReactiveFormsModule,
  //   InputTextareaModule,

  // ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  forgot:boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private router:Router,private hash:HashPasswordService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.reloadPage();
          this.router.navigate(['/home'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err);
        
        this.isLoginFailed = true;
      }
    });
  }
  forgotPassword(){
    this.forgot = true;
  }
  reloadPage(): void {
    window.location.reload();
  }
}

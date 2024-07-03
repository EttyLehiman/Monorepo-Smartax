import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrl: './restart-password.component.css'
})
export class RestartPasswordComponent {
  form: any = {
    password: null,
    passwordAuthentication: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {


    if (this.form.password !== this.form.passwordAuthentication) {
      this.isLoginFailed = true;
      this.errorMessage = "Passwords do not match";
    }
    else {

      this.userService.changPassword(this.form.password).subscribe(
        newToken => {
          if (newToken && newToken.token) {
            this.storageService.saveUser(newToken.token);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.router.navigate(['/home'])
          }
        },
        error => {
          alert('Failed to change password');

        }
      )
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}

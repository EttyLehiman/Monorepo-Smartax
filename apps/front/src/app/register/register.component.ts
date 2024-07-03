import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Role } from '../_models/role.module';
import { RoleServiceService } from '../_services/role-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router:Router,private userService: UserService, private authService: AuthService,private roleService:RoleServiceService) { }
 allRolies:Role[]=[]
  ngOnInit(): void {
    this.roleService.getAllRolies().subscribe(
      suc=>{this.allRolies=suc
        console.log(this.allRolies)
      },
      err=>console.log(err)
    )
  }
  form: any = {
    username: null,
    email: null,
    passwordHash: null,
    role:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  onSubmit(): void {
    const { username, passwordHash, email ,role} = this.form;
    console.log(username, passwordHash, email);
    this.userService.register(username, passwordHash, email, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        console.log(err);

        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}

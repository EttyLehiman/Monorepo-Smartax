import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../_services/forgot-password.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  // styleUrl: './forget-password.component.css'
})
export class ForgotPasswordComponent {

  
  
  visible: boolean = true;
  userEmail: string = ''; // Variable to hold the email entered by user
  emailForm: FormGroup; // Define a FormGroup for email validation
  currentUser:any;

  constructor(private fb: FormBuilder,private forgotService: ForgotPasswordService,storage:StorageService) {
    // Initialize the form with FormBuilder
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Add Validators for required and email
    });
    this.currentUser=storage.getUser()
  }

  

  onSubmit() {
    const email = this.userEmail; // Retrieve the entered email from the variable
    // Example action: Call your service to send the email
    this.forgotService.forgotPassword(email).subscribe(
      (response) => {
        // Success Message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `The email sent to ${email}.`,
        });
        console.log(response);
      },
      (error) => {
        // Failure Message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to send email. Please try again.',
        });
        console.log(error);
      }
    );
    // Optionally, close the dialog
    this.visible = false;
  }

  get email() {
    return this.emailForm?.get('email');
  }


  
}


// validateEmail(emailForm: FormGroup): { [key: string]: any } | null {
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//   const emailControl = emailForm.get('email'); // Assuming the email field name is 'email'

//   if (
//     emailControl &&
//     emailControl.value &&
//     !emailPattern.test(emailControl.value.toLowerCase())
//   ) {
//     return { invalidEmail: true };
//   }

//   return null;
// }

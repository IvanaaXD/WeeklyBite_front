import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CreateUserDTO, Role } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  accountType: string = 'event-organizer'; 
  errorMessage: string = '';
  selectedProfilePictureFile: File | null = null; 
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthLocation: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      profilePicture: [null]
    }, { validators: passwordMatchValidator });
  }

  onAccountTypeChange(type: string): void {
    this.accountType = type;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedProfilePictureFile = event.target.files[0];
    } else {
      this.selectedProfilePictureFile = null;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData: CreateUserDTO = {
        ...this.registrationForm.value,
        role: this.accountType === 'user' ? Role.USER : Role.ADMIN,
        agency: null,
        profilePicture: null as any
      };

      this.userService.registerUser(userData, this.selectedProfilePictureFile).subscribe({
        next: (response: any) => {
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please check your data or try again later.';
          if (error.status === 409) {
            this.errorMessage = 'The email you entered is already in use.';
          } else if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }

  return { passwordMismatch: true };
};
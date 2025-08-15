import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../model/auth-response.model';
import { LoginRequest } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  isPasswordVisible: boolean = false;
  passwordFieldType: string = 'password';
  errorMessage: string | null = null;
  
  constructor(private authService: AuthService,
              private router: Router) {
  }
  
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      };

      localStorage.removeItem('currentAppUser');
      this.errorMessage = null;

      this.authService.login(loginRequest).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('currentAppUser', response.jwt);
          this.authService.setUser();
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'Login failed. Please check your email and password.';
          console.error('Login error:', error);
        }
      });
    }
  }
}
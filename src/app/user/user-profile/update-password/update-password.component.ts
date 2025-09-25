import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { ChangePasswordRequest } from '../../model/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit{
  passwordForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>,
    private fb: FormBuilder, 
    private userService: UserService,
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]], 
      rePassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); 
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const rePassword = form.get('rePassword')?.value;

    return newPassword === rePassword ? null : { mismatch: true };
  }

  saveChanges(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request: ChangePasswordRequest = {
      oldPassword: this.passwordForm.get('oldPassword')?.value,
      newPassword: this.passwordForm.get('newPassword')?.value
    };

    this.userService.changePassword(request)
      .pipe(
        finalize(() => {
          this.isLoading = false; 
        })
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(true); 
        },
        error: (error) => {
          console.error('Error changing password:', error);
          const errorMessage = error.error?.message || 'Failed to change password. Please check your current password.';
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}

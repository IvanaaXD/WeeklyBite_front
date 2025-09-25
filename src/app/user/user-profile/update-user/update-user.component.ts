import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { User, UpdateUserRequest } from '../../model/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  userData: User;
  selectedFileName: string = '';
  selectedFile: File | null = null;
  isLoading: boolean = false; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    private userService: UserService, 
  ) {

    this.userData = { ...data.user }; 
    if (this.userData.profilePicture) {
      this.selectedFileName = 'Existing profile picture'; 
    }
  }

  onFileSelected(event: Event): void { 
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
    }
  }

  saveChanges(): void {
    this.isLoading = true; 

    const userUpdateRequest: UpdateUserRequest = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      phoneNumber: this.userData.phoneNumber,
      birthLocation: this.userData.birthLocation
    };

    this.userService.updateUserBasic(userUpdateRequest)
      .subscribe({
        next: (updatedUser) => {

          if (this.selectedFile) {
            this.userService.uploadProfilePicture(this.selectedFile)
              .pipe(
                finalize(() => {
                  this.isLoading = false; 
                  this.dialogRef.close(true);
                })
              )
              .subscribe({
                next: () => {
                },
                error: (picError) => {
                  console.error('Error uploading profile picture:', picError);
                }
              });
          } else {
            this.isLoading = false; 
            this.dialogRef.close(true);
          }
        },
        error: (userError) => {
          console.error('Error updating user info:', userError);
          this.isLoading = false; 
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}

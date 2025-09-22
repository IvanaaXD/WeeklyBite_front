import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { User } from '../../model/user.model';
import { UserService } from '../../user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { ConfirmDeactivationComponent } from '../confirm-deactivation/confirm-deactivation.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{
  @Input() currentUser: User | null = null;
  @Output() userInfoUpdated = new EventEmitter<void>();
  canDeactivateAccount: boolean = true;
  deactivationMessage: string = '';

  constructor(private dialog: MatDialog, private userService: UserService, public authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe(r => console.log('userRole$ now:', r));
  }

  getAdditionalAttributes() {
    if (!this.currentUser) {
      return [];
    }

    const mainAttributes: (keyof User)[] = ['firstName', 'lastName', 'email', 'role', 'profilePicture', 'id'];

    return Object.keys(this.currentUser)
      .filter(key => !mainAttributes.includes(key as keyof User))
      .map(key => ({
        key,
        value: (this.currentUser as Record<string, any>)[key],
      }));
  }

  openEditUserDialog(): void {
    (document.activeElement as HTMLElement)?.blur();
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userInfoUpdated.emit();
      }
    });
  }
  /*
  changeUpgradeUserDialog(): void{
    (document.activeElement as HTMLElement)?.blur();
    const dialogRef = this.dialog.open(UpgradeRoleComponent, {
      width: '600px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userInfoUpdated.emit();
      }
    });
  }*/

  changePasswordDialog(): void {
    (document.activeElement as HTMLElement)?.blur();
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'full-screen-dialog', 
      backdropClass: 'custom-backdrop',
      disableClose: true, 
      data: this.currentUser, 
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  onDeactivateAccount(): void {
    (document.activeElement as HTMLElement)?.blur();
    const dialogRef = this.dialog.open(ConfirmDeactivationComponent, {
      width: '400px',
      data: {
        title: 'Deactivate Account',
        message: 'Are you sure you want to deactivate your account? This action cannot be undone.',
        confirmText: 'Deactivate',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deactivateAccount().subscribe({
          next: () => {
            this.authService.logout();
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Deactivation failed:', error);
          }
        });
      }
    });
  }
}

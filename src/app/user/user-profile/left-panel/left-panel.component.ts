import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { User } from '../../model/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit{

  currentUser: User | null = null;  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    const userRole: string = role?.startsWith('ROLE_') ? role.substring(5) : (role ?? '');

    this.getUserInfo();
  }

  getUserInfo(): void {
    this.isLoading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load user info:', error);
        this.isLoading = false;
      }
    });
  }
}

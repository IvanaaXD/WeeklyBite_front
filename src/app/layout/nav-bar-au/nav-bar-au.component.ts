import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-nav-bar-au',
  templateUrl: './nav-bar-au.component.html',
  styleUrls: ['./nav-bar-au.component.css']
})
export class NavBarAuComponent {

  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.role = this.authService.getRole();
  }

  logOut(): void {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
import { Component } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  role: string | null = null;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.role = role;
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
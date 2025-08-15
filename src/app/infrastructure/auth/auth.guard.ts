import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }

    const role: string | null = this.authService.getRole();
    if (role === null) {
      this.router.navigate(['/home']);
      return false;
    }

    const userRole: string = role.startsWith('ROLE_') ? role.substring(5) : role;
    const allowedRoles: string[] | undefined = route.data['role'];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']); 
      return false;
    }

    return true;
  }
}
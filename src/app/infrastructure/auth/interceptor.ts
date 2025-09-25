import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  
  private publicPaths = [
    '/api/login',
    '/api/users/register', 
    '/api/accounts/activate',
  ];

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('currentAppUser');
    const isPublicPath = this.publicPaths.some(path => req.url.includes(path));

    if (isPublicPath || !this.authService.isLoggedIn()) {
      return next.handle(req);
    }
    
    if (accessToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
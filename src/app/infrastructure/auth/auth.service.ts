import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { environment } from '../../../env/environment';
import { LoginRequest } from './model/login.model';
import { AuthResponse } from './model/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiHost + '/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private jwtHelper = new JwtHelperService();

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.updateRoleFromToken();
  }

  login(auth: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, auth, {
      headers: this.headers,
    }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('currentAppUser', response.jwt);
        this.updateRoleFromToken();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentAppUser');
    this.userRoleSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('currentAppUser');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string | null {
    const token = localStorage.getItem('currentAppUser');
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        if (decodedToken && decodedToken.role && decodedToken.role.length > 0) {
          return decodedToken.role[0] || null;
        }
      } catch (e) {
        console.error("Greška pri dekodiranju tokena:", e);
      }
    }
    return null;
  }

  private updateRoleFromToken(): void {
    const role = this.getRole();
    this.userRoleSubject.next(role);
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('currentAppUser');
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.sub || null;
      } catch (e) {
        console.error("Greška pri dekodiranju tokena:", e);
      }
    }
    return null;
  }

  public setUser(): void {
    const role = this.getRole();
    this.userRoleSubject.next(role);
  }

  public getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('currentAppUser');
    if (token) {
      const helper = new JwtHelperService();
      try {
        const decodedToken = helper.decodeToken(token);
        return decodedToken?.sub || null;
      } catch (e) {
        console.error("Greška pri dekodiranju tokena:", e);
      }
    }
    return null;
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../env/environment';
import { AuthService } from '../infrastructure/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangePasswordRequest, CreateUserDTO, UpdateUserRequest, User } from './model/user.model';
import { GetRecipe } from '../recipe/model/recipe.model';

export interface Account {
  id: number;
  email: string;
  accountStatus: string;  
  role: string; 
  mutedNotification: boolean;
  isSuspended: boolean;
  suspensionEndTime: Date;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  
  private apiUrl = environment.apiHost + '/api';
  private pupProfilePictureFile: File | null = null;

  constructor(private http: HttpClient) {}

  init(authService: AuthService):void {
      
  }


  registerUser(userData: CreateUserDTO, profilePictureFile: File | null, agencyPictures: File[] = []): Observable<any> {
    const formData = new FormData();
    
    formData.append('user', new Blob([JSON.stringify(userData)], { type: 'application/json' }));
    
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile, profilePictureFile.name);
    }
    
    if (agencyPictures && agencyPictures.length > 0) {
      for (const picture of agencyPictures) {
        formData.append('agencyPictures', picture, picture.name);
      }
    }

    return this.http.post<any>(`${this.apiUrl}/users`, formData);
  }

  getUserDetails(currentUserEmail: string): Observable<User> {
    if (currentUserEmail != null) {
      return this.http
        .get<any>(`${environment.apiHost}/api/users/search?email=${currentUserEmail}`)
      .pipe(
        map((userResponse) => {
          return {
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            email: currentUserEmail
          } as User;
        })
      );
  } else {
    console.error('ID korisnika nije pronađen u JWT tokenu.');
    throw new Error('ID korisnika nije pronađen u JWT tokenu.');
  }
}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/current`)
  }

  updateUserBasic(userRequest: UpdateUserRequest): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/me`, userRequest);
  }

  uploadProfilePicture(profilePicture: File): Observable<void> {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture, profilePicture.name);
    return this.http.post<void>(`${this.apiUrl}/users/profile-picture`, formData);
  }

  changePassword(passwordRequest: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/change-password`, passwordRequest);
  }

  deactivateAccount(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/deactivate`);
  }

  hasFutureCommitments(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/accounts/me/has-future-commitments`);
  }

  getFavoriteRecipes(): Observable<GetRecipe[]> {
    return this.http.get<GetRecipe[]>(`${this.apiUrl}/accounts/favorites/recipes`);
  }
  
  addToFavoriteRecipes(recipeId: number) {
    return this.http.post(`${environment.apiHost}/api/accounts/favorites/${recipeId}`,null)
  }
}

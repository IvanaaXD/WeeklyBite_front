import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// import { AgencyInfo, ChangePasswordRequest, CreateUserDTO, UpdateAgencyRequest, UpdateUserRequest, User, UserDTO } from './model/user.model';
import { environment } from '../../env/environment';
import { AuthService } from '../infrastructure/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateUserDTO } from './model/user.model';

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
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  private apiUrl = environment.apiHost + '/api';
//  private user: CreateUserDTO;
  private pupProfilePictureFile: File | null = null;

  constructor(private http: HttpClient) {}

init(authService: AuthService):void {
    
}
//   init(authService: AuthService): void {
//     const email = authService.getUserEmailFromToken();

//   if (email) {
//     this.setUserDataForPUP({
//       email: email,
//       firstName: '',
//       lastName: '',
//       profilePicture: '',
//       birthLocation: undefined,
//       phoneNumber: '',
//       password: '',
//       confirmPassword: '',
//       role: '',
//       agency: undefined
//     });
//   } else {
//     console.warn("Nema emaila u tokenu, korisnik nije inicijalizovan.");
//   }
// }

//   initializeUserEmail(authService: AuthService): void {
//     const email = authService.getUserEmailFromToken();
//     if (email) {
//       this.setUserDataForPUP({
//         email: email,
//         firstName: '',
//         lastName: '',
//         profilePicture: '',
//         birthLocation: undefined,
//         phoneNumber: '',
//         password: '',
//         confirmPassword: '',
//         role: '',
//         agency: undefined
//       });
//     } else {
//       console.error('Email nije pronađen u tokenu.');
//     }
//   }

//   getLoggedInUser() {
//     return '';
//   }

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

// //   setUserDataForPUP(userData: CreateUserDTO) {
// //     this.user = userData
// //   }

// //   getUserDataForPUP(){
// //     return { ...this.user };
// //   }

// //   setUserDetailsForPUP(userData: CreateUserDTO, profilePicture: File | null) {
// //     this.user = userData
// //     this.pupProfilePictureFile = profilePicture
// //   }
// //   getUserDetailsForPUP(): { userData: CreateUserDTO | null, profilePicture: File | null } {
// //     return {
// //       userData: this.user,
// //       profilePicture: this.pupProfilePictureFile
// //     };
// //   }

//   getLoggedInUserRoles(): string[] {
//     if (this.user) {
//       const accessToken: any = localStorage.getItem('currentAppUser');
//       const helper = new JwtHelperService();
//       return helper.decodeToken(accessToken).role;
//     } else {
//       console.error('Korisnik nema role.')
//       return ['']
//     }
//   }

//   getUserDetails(currentUserEmail: string): Observable<User> {
//     if (currentUserEmail != null) {
//       console.log(currentUserEmail);
//       return this.http
//         .get<any>(`${environment.apiHost}/api/users/search?email=${currentUserEmail}`, {
//           headers: this.headers,
//       })
//       .pipe(
//         map((userResponse) => {
//           return {
//             id: userResponse.id,
//             firstName: userResponse.firstName,
//             lastName: userResponse.lastName,
//             email: currentUserEmail
//           } as User;
//         })
//       );
//   } else {
//     console.error('ID korisnika nije pronađen u JWT tokenu.');
//     throw new Error('ID korisnika nije pronađen u JWT tokenu.');
//   }
// }

//   getAccountByEmail(email: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/accounts/search?email=${encodeURIComponent(email)}`);
//   }

//   getAccountById(id: number): Observable<UserDTO> {
//     return this.http.get<UserDTO>(`${this.apiUrl}/users/${id}`);
//   }

//   getUserByEmail(email: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/users/search?email=${encodeURIComponent(email)}`);
//   }

//   blockUser(blockerId: number, blockedUserId: number): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/accounts/block/${blockerId}/${blockedUserId}`, {});
//   }
//   getBlockedUsers(): Observable<number[]> {
//     return this.http.get<number[]>(`${this.apiUrl}/accounts/blocked-organizers`);
//   }

//   checkIfBlocked(currentUserId: number, targetUserEmailFromToken: string) {
//     return this.http.get<{ isBlocked: boolean }>(`${this.apiUrl}/accounts/check-blocked/${currentUserId}/${targetUserEmailFromToken}`);
//   }
  
// isBlocked(email1: string, email2: string): Observable<boolean> {
//   return this.http.get<boolean>(`/api/accounts/is-blocked/${email1}/${email2}`);
// }

//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/users/current`)
//   }

//   updateUserBasic(userRequest: UpdateUserRequest): Observable<User> {
//     return this.http.patch<User>(`${this.apiUrl}/users/me`, userRequest);
//   }

//   uploadProfilePicture(profilePicture: File): Observable<void> {
//     const formData = new FormData();
//     formData.append('profilePicture', profilePicture, profilePicture.name);
//     return this.http.post<void>(`${this.apiUrl}/users/profile-picture`, formData);
//   }

//   changePassword(passwordRequest: ChangePasswordRequest): Observable<void> {
//     return this.http.post<void>(`${this.apiUrl}/accounts/change-password`, passwordRequest);
//   }

//   deactivateAccount(): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/accounts/deactivate`);
//   }

//   hasFutureCommitments(): Observable<boolean> {
//     return this.http.get<boolean>(`${this.apiUrl}/accounts/me/has-future-commitments`);
//   }

//   updateMyAgencyInfo(request: UpdateAgencyRequest): Observable<AgencyInfo> {
//     return this.http.put<AgencyInfo>(`${this.apiUrl}/agency`, request);
//   }

//   uploadAgencyPictures(files: File[]): Observable<void> {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('pictures', file, file.name);
//     });
//     return this.http.post<void>(`${this.apiUrl}/agency/pictures`, formData);
//   }

//   getFavoriteEvents(): Observable<EventSummary[]> {
//     return this.http.get<EventSummary[]>(`${this.apiUrl}/accounts/favorites/events`);
//   }

//   getFavoriteProducts(): Observable<ProductSummary[]> {
//     return this.http.get<ProductSummary[]>(`${this.apiUrl}/accounts/favorites/products`);
//   }

//   getFavoriteServices(): Observable<ServiceSummary[]> {
//     return this.http.get<ServiceSummary[]>(`${this.apiUrl}/accounts/favorites/services`);
//   }
}

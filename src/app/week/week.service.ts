import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { GetWeek } from './model/get-week.model';
import { GetRecipe } from '../recipe/model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  private apiUrl = `${environment.apiHost}/api/weeks`;

  constructor(private httpClient: HttpClient) {}

  getCurrentWeek(): Observable<GetWeek> {
    return this.httpClient.get<GetWeek>(`${this.apiUrl}/current-week`);
  }

  getNextWeek(): Observable<GetWeek> {
    return this.httpClient.get<GetWeek>(`${this.apiUrl}/next-week`);
  }

  getPastWeeks(): Observable<GetWeek[]> {
    return this.httpClient.get<GetWeek[]>(`${this.apiUrl}/past-weeks`);
  }

  createWeek(): Observable<GetWeek> {
    return this.httpClient.post<GetWeek>(`${this.apiUrl}`, null); 
  }

  sendWeeklyPdf(): Observable<string> {
    return this.httpClient.post(`${environment.apiHost}/api/emails/send-pdf`, null, { responseType: 'text' });
  }

  checkWeeks(): Observable<any> {
    return this.httpClient.post(`${environment.apiHost}/check-weeks`, {});
  }
}

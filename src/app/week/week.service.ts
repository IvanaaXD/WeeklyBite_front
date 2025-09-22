import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { GetWeek } from './model/get-week.model';

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

  createWeek(): Observable<GetWeek> {
    return this.httpClient.post<GetWeek>(`${this.apiUrl}`, null); 
  }
}

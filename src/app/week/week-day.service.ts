import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { UpdateWeekDay } from './model/update-week-day.model';
import { Observable } from 'rxjs';
import { GetWeekDay } from './model/get-week-day.model';

@Injectable({
  providedIn: 'root'
})
export class WeekDayService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = `${environment.apiHost}/api/week-days`;

  update(weekDay: UpdateWeekDay, weekDayId: number): Observable<GetWeekDay> {
    return this.httpClient.put<GetWeekDay>(`${this.apiUrl}/${weekDayId}`, weekDay);
  }
}

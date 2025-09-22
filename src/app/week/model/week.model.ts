import { WeekDay } from './week-day.model';

export interface Week {
  id: number;
  weekDays: WeekDay[];
  startDate: string; 
  endDate: string;
}

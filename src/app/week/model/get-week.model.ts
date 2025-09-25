import { GetWeekDay } from "./get-week-day.model";

export interface GetWeek {
  id: number;
  weekDays: GetWeekDay[];
  startDate: string; 
  endDate: string;
}
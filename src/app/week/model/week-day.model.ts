import { GetRecipe } from "../../recipe/model/recipe.model";
import { Week } from "./week.model";


export interface WeekDay {
  id: number;
  day: Day;          
  week: Week;        
  recipes: GetRecipe[];
}

export enum Day {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7
}
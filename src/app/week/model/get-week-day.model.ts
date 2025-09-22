import { GetRecipe } from "../../recipe/model/recipe.model";
import { Day } from "./week-day.model";


export interface GetWeekDay {
  id: number;
  day: Day;
  weekId: number;
  recipes: GetRecipe[];
}

import { RecipeCategory } from "../../recipe/model/recipe.model";

export interface UpdateWeekDay {
  id: number;
  recipeCategory: RecipeCategory;
  recipeId: number;
}

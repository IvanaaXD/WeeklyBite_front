import { GetIngredient } from "../../ingredient/model/ingredient.model";
import { Step } from "./step.model";

export interface GetRecipe {
    id: number;
    created: Date;
    updated: Date;
    name: string;
    content: string;
    description: Step[];
    duration: number;
    numberOfPeople: number;
    isDeleted: boolean;
    adminId: number;
    category: RecipeCategory;
    pictures: string[];
    products: GetIngredient[];
}

export enum RecipeCategory {
  BREAKFAST = 1,
  LUNCH = 2,
  DINNER = 3,
  SNACK = 4,
  DESSERT = 5
}

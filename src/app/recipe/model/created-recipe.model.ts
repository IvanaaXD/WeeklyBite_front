import { GetIngredient } from "../../ingredient/model/ingredient.model";
import { RecipeCategory } from "./recipe.model";
import { Step } from "./step.model";

export interface CreatedRecipe {
    id: number; 
    name: string;
    content: string;
    description: Step[];
    duration: number;
    numberOfPeople: number;
    adminId: number;
    category: RecipeCategory;
    pictures: string[];
    products: GetIngredient[];
}
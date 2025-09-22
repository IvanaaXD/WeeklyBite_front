import { GetIngredient } from "../../ingredient/ingredient.model";
import { RecipeCategory } from "./recipe.model";
import { Step } from "./step.model";

export interface CreateRecipe {
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
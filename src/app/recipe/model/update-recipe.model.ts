import { GetIngredient } from "../../ingredient/model/ingredient.model";
import { RecipeCategory } from "./recipe.model";
import { Step } from "./step.model";

export interface UpdateRecipe {
    id: number;
    name: string;
    content: string;
    description: Step[];
    duration: number;
    numberOfPeople: number;
    category: RecipeCategory;
    pictures: string[];
    products: GetIngredient[];
}
import { GetIngredient } from "../../ingredient/ingredient.model";

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

export class Step {
  constructor(
    public name: string,
    public description: string
  ) {}
}

export enum RecipeCategory {
    BREAKFAST,
    LUNCH,
    DINNER,
    SNACK
}
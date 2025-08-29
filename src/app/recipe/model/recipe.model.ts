import { GetIngredient } from "../../ingredient/ingredient.model";

export interface GetRecipe {
    id: number;
    created: Date;
    updated: Date;
    name: string;
    content: string;
    description: string;
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
    description: string;
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
    description: string;
    duration: number;
    numberOfPeople: number;
    adminId: number;
    category: RecipeCategory;
    pictures: string[];
    products: GetIngredient[];
}

export enum RecipeCategory {
    BREAKFAST,
    LUNCH,
    DINNER,
    SNACK
}
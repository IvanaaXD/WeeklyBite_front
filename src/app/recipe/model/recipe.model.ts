import { GetProduct } from "../../product/product.model";

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
    products: GetProduct[];
}

export enum RecipeCategory {
    BREAKFAST,
    LUNCH,
    DINNER,
    SNACK
}
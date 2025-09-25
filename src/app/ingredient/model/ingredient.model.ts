
export interface GetIngredient {
    id: number;
    name: string;
    quantity:number;
    unit: string;
}

export interface Ingredient {
    id: number;
    name: string;
    quantity:number;
    unit: string;
}

export interface CreateIngredient {
    name: string;
    quantity:number;
    unit: string;
}

export interface IngredientWithQuantityDTO {
    name: string;
    quantity:number;
    unit: string;
}

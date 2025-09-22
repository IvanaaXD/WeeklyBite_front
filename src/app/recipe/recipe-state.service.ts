import { Injectable } from '@angular/core';
import { CreateRecipe } from './model/create-recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeStateService {
  private recipeData: CreateRecipe | null = null;
  private recipePictures: File[] = []; 
  private recipeId: number = -1;

  setRecipe(data: CreateRecipe) {
    this.recipeData = data;
  }

  getRecipe(): CreateRecipe | null {
    return this.recipeData;
  }

  clearRecipe() {
    this.recipeData = null;
  }

  setPictures(files: File[]) {
    this.recipePictures = files;
  }

  getPictures(): File[] {
    return this.recipePictures;
  }

  clearPictures() {
    this.recipePictures = [];
  }

  setRecipeId(id: number) {
    this.recipeId = id;
  }

  getRecipeId(): number {
    return this.recipeId;
  }

  clearRecipeId() {
    this.recipeId = -1;
  }
}


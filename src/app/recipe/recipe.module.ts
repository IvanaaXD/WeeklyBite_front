import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { LayoutModule } from '../layout/layout.module';
import { CreateDescriptionComponent } from './create-description/create-description.component';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    RecipesPageComponent,
    CreateDescriptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule,
    FormsModule,
    LayoutModule
  ]
})
export class RecipeModule { }
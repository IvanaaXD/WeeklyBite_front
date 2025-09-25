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
import { UserModule } from '../user/user.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UpdateDescriptionComponent } from './update-description/update-description.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    RecipesPageComponent,
    CreateDescriptionComponent,
    RecipeDetailsComponent,
    UpdateDescriptionComponent,
    UpdateRecipeComponent,
    DeleteRecipeComponent,
    AllRecipesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule,
    FormsModule,
    LayoutModule,
    UserModule
  ]
})
export class RecipeModule { }
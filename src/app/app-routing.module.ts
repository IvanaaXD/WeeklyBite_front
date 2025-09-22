import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipesPageComponent } from './recipe/recipes-page/recipes-page.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';
import { CreateDescriptionComponent } from './recipe/create-description/create-description.component';
import { AdminCommentComponent } from './comment/admin-comment/admin-comment.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { UpdateRecipeComponent } from './recipe/update-recipe/update-recipe.component';
import { UpdateDescriptionComponent } from './recipe/update-description/update-description.component';
import { ProfileComponent } from './user/user-profile/profile/profile.component';
import { WeeklyRecipesComponent } from './recipe/weekly-recipes/weekly-recipes.component';
import { AllRecipesComponent } from './recipe/all-recipes/all-recipes.component';
import { NextWeekComponent } from './week/next-week/next-week.component';
import { WeeklyIngredientsComponent } from './ingredient/weekly-ingredients/weekly-ingredients.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'recipes', component: RecipesPageComponent },
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'update-recipe/:id', component: UpdateRecipeComponent },
  { path: 'update-description/:id', component: UpdateDescriptionComponent },
  { path: 'all-recipes/:day/:recipe-category', component: AllRecipesComponent },
  { path: 'create-description', component: CreateDescriptionComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'comments', component: AdminCommentComponent, canActivate: [AuthGuard], data: { role: ['ADMIN'] }},
  { path: 'my-recipes-page', component: WeeklyRecipesComponent, canActivate: [AuthGuard] },
  { path: 'next-week', component: NextWeekComponent, canActivate: [AuthGuard] },
  { path: 'weekly-ingredients/:weekId', component: WeeklyIngredientsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'recipes', component: RecipesPageComponent},
  { path: 'create-recipe', component: CreateRecipeComponent},
  { path: 'create-description', component: CreateDescriptionComponent},
  { path: 'comments', component:AdminCommentComponent, canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }},];


@NgModule({
  imports: [    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
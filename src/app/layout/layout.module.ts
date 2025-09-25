import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarAuComponent } from './nav-bar-au/nav-bar-au.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { TopRecipesComponent } from './home/top-recipes/top-recipes.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeListComponent } from './home/recipe-list/recipe-list.component';
import { RecipeFilterComponent } from './home/recipe-filter/recipe-filter.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    NavBarAuComponent,
    TopRecipesComponent,
    FooterComponent,
    RecipeListComponent,
    RecipeFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    HomeComponent,
    NavBarAuComponent,
    FooterComponent,
    RecipeFilterComponent,
    RecipeListComponent
  ]
})
export class LayoutModule { }
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  recipeFilters: any = {};

  onRecipeFiltersChanged(filters: any): void {
    this.recipeFilters = filters;
  }
}
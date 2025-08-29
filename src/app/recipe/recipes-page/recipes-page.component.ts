import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
   
  recipeFilters: any = {};

  onFiltersChanged(filters: any): void {
    this.recipeFilters = filters;
  }
  ngOnInit(){
    document.body.style.overflow = "auto"; 
  }

  constructor(public router: Router) {} 

  openDialog(): void {
    this.router.navigate(['/create-recipe']); 
  }

}

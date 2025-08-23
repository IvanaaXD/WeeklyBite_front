import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { GetRecipe } from '../../../recipe/model/recipe.model';
import { RecipeService } from '../../../recipe/recipe.service';

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrl: './top-recipes.component.css'
})
export class TopRecipesComponent implements OnInit{
  recipes: GetRecipe[] = [];
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService) { }
  
  ngOnInit() {
    this.getTopFiveEvents();
    this.isLoggedIn =  this.authService.isLoggedIn();
  }

  onViewEvent(event: GetRecipe): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/event-details', event.id]);
    }
    else {
      this.router.navigate(['/event-details', event.id]);
    }
  }
  getTopFiveEvents(): void {
    this.recipeService.getTopFive().subscribe(
      (data: GetRecipe[]) => {
        this.recipes = data; 
        console.log(this.recipes)
      },
      (error) => {
        console.error('Error while fetching top 5 events', error);

      }
    );
  } 
} 
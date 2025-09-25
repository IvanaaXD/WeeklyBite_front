import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrl: './favorite-recipes.component.css'
})
export class FavoriteRecipesComponent {
  recipes: any[] | undefined;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getFavoriteRecipes().subscribe(
      (events) => {
        this.recipes = events;
      },
      (error) => {
        console.error('Greška prilikom učitavanja omiljenih događaja:', error);
      }
    );
  }
}

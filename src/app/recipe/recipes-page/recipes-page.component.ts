import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../comment/comment.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { UserService } from '../../user/user.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
   
  recipeFilters: any = {};
  isAdmin: boolean = false;

  constructor(
      private authService: AuthService,
      private userService: UserService,
      private router: Router
    ) { }

  onFiltersChanged(filters: any): void {
    this.recipeFilters = filters;
  }

  ngOnInit() : void{
    document.body.style.overflow = "auto"; 

    const role = this.authService.getRole();
    this.isAdmin = role === 'ROLE_ADMIN';
  }

  openDialog(): void {
    this.router.navigate(['/create-recipe']); 
  }

}

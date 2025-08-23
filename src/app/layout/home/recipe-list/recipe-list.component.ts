import { Component, Input, OnInit } from '@angular/core';
import { GetRecipe } from '../../../recipe/model/recipe.model';
import { RecipeService } from '../../../recipe/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{
  private _filters: any = {};

  @Input() set filters(val: any) {
    const curr = val ?? {};
    if (!this.deepEqual(this._filters, curr)) {
      this._filters = curr;
      this.pageProperties.page = 0;   
      this.getPagedEntities();
    }
  }
  get filters() { return this._filters; }
  
  recipes: GetRecipe[] = [];
  isAdmin: boolean = true;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  isLoggedIn: boolean = false;

  pageProperties = {
    page: 0,
    pageSize: 6,
    totalCount: 0,
    pageSizeOptions: [6, 12, 18]
  };
  constructor(private recipeService: RecipeService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getPagedEntities();
    this.isLoggedIn =  this.authService.isLoggedIn();
  }

  private deepEqual(a: any, b: any): boolean {
    return JSON.stringify(a ?? {}) === JSON.stringify(b ?? {});
  }

  private getPagedEntities(): void {
    const page = this.pageProperties.page;
    const size = this.pageProperties.pageSize;

    if (this.filters && Object.keys(this.filters).length > 0) {
      this.recipeService.getFilteredRecipes(this.filters, page, size).subscribe(response => {
        this.recipes = response.content;
        this.pageProperties.totalCount = response.totalElements;
        this.updatePagination();});
    } 
    else {
      this.recipeService.getAll(this.pageProperties.page, this.pageProperties.pageSize)
      .subscribe(response => {
        this.recipes = response.content;
        this.pageProperties.totalCount = response.totalElements;
        this.updatePagination();});
    }
  }
  
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.pageProperties.totalCount / this.pageProperties.pageSize);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i);
  }

  changePageSize(): void {
    this.pageProperties.page = 0;
    this.getPagedEntities();
  }

  goToPage(page: number): void {
    this.pageProperties.page = page;
    this.getPagedEntities();
  }

  prevPage(): void {
    if (this.pageProperties.page > 0) {
      this.pageProperties.page--;
      this.getPagedEntities();
    }
  }

  nextPage(): void {
    if (this.pageProperties.page < this.totalPages - 1) {
      this.pageProperties.page++;
      this.getPagedEntities();
    }
  }

  onViewEvent(event: GetRecipe): void {
    if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/event-details', event.id]);
    } 
    else {
      this.router.navigate(['/event-details', event.id]);
    }
  }
}

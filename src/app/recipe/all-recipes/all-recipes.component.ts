import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { GetRecipe, RecipeCategory } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';
import { UpdateWeekDay } from '../../week/model/update-week-day.model';
import { WeekDayService } from '../../week/week-day.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  recipes: GetRecipe[] = [];
  isAdmin: boolean = true;
  isLoggedIn: boolean = false;

  recipeCategory: string = '';
  weekId: number = 0;
  weekDayId: number = 0;

  pageProperties = {
    page: 0,
    pageSize: 6,
    totalCount: 0,
    pageSizeOptions: [6, 12, 18]
  };
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  filterForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private weekDayService: WeekDayService
  ) {

    this.filterForm = this.fb.group({
      breakfast: [false],
      lunch: [false],
      dinner: [false],
      dessert: [false],
      snack: [false],
      duration: [''],
      content: [''],
      numberOfPeople: [''],
      name: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.route.paramMap.subscribe(params => {
      this.recipeCategory = params.get('recipe-category') || '';
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.weekId = Number(queryParams.get('weekId'));
      this.weekDayId = Number(queryParams.get('weekDayId'));
    });

    this.onApplyFilters();
    this.getPagedEntities();
  }

  getPagedEntities(): void {
    const page = this.pageProperties.page;
    const size = this.pageProperties.pageSize;
    const filters = { ...this.setFilterValue(), category: this.recipeCategory.toLowerCase() };

    this.recipeService.getFilteredRecipes(filters, page, size).subscribe(response => {
      this.recipes = response.content;
      this.pageProperties.totalCount = response.totalElements;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.pageProperties.totalCount / this.pageProperties.pageSize);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i);
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

  addRecipe(recipe: GetRecipe) {

    const updateWeekDay: UpdateWeekDay = {
      id: this.weekDayId,
      recipeCategory: this.recipeCategory as unknown as RecipeCategory,
      recipeId: recipe.id,
    };

    this.weekDayService.update(updateWeekDay, this.weekDayId).subscribe({
      next: (updatedWeekDay) => {
        this.router.navigate(['/next-week']);
      },
      error: (err) => {
        console.error('Error updating week day:', err);
      }
    });
  }

  onApplyFilters(): void {
    this.pageProperties.page = 0;
    this.getPagedEntities();
  }

  setFilterValue() {
    this.filterForm.patchValue({
      breakfast: false,
      lunch: false,
      dinner: false,
      dessert: false,
      snack: false
    });

    const category = this.recipeCategory.toLowerCase();

    switch (category) {
      case 'breakfast':
        this.filterForm.patchValue({ breakfast: true });
        break;
      case 'lunch':
        this.filterForm.patchValue({ lunch: true });
        break;
      case 'dinner':
        this.filterForm.patchValue({ dinner: true });
        break;
      case 'snack':
        this.filterForm.patchValue({ snack: true });
        break;
      case 'dessert':
        this.filterForm.patchValue({ dessert: true });
        break;
      default:
        break;
    }

    return this.filterForm.value;
  }
}

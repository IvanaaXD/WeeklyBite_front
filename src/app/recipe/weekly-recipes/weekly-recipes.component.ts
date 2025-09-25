import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetRecipe, RecipeCategory } from '../model/recipe.model';
import { Day } from '../../week/model/week-day.model';
import { WeekService } from '../../week/week.service';
import { Router } from '@angular/router';
import { GetWeekDay } from '../../week/model/get-week-day.model';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-weekly-recipes',
  templateUrl: './weekly-recipes.component.html',
  styleUrls: ['./weekly-recipes.component.css'] 
})
export class WeeklyRecipesComponent implements OnInit {

  days = Object.values(Day).filter(value => isNaN(Number(value)));
  meals = Object.values(RecipeCategory).filter(value => isNaN(Number(value)));

  weekStartDate: string = '';
  weekEndDate: string = '';

  weekId: number = 0; 
  dayToWeekDayId: { [day: string]: number } = {};

  mealPlan: { [meal: string]: { [day: string]: GetRecipe | null } } = {};
  allRecipeDetails: GetRecipe[] = [];

  constructor(private weekService: WeekService, 
              private router: Router, 
              private authService: AuthService, 
              private cdr: ChangeDetectorRef
  ) {
    this.meals.forEach(meal => {
      this.mealPlan[meal] = {};
      this.days.forEach(day => {
        this.mealPlan[meal][day] = null; 
      });
    });
  }

  ngOnInit(): void {
    this.loadCurrentWeek();
  }

  loadCurrentWeek() {
    this.weekService.getCurrentWeek().subscribe(week => {
      this.weekId = week.id; 
      this.weekStartDate = week.startDate;
      this.weekEndDate = week.endDate;

      week.weekDays.forEach((weekDay: GetWeekDay) => {
        const day = weekDay.day;
        this.dayToWeekDayId[day] = weekDay.id;
        weekDay.recipes.forEach(recipe => {
          const meal = recipe.category;
          if (recipe.id != 0)
            this.mealPlan[meal][day] = recipe;
        });
      });
    });
  }

  goToRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}`;
  }

  downloadPDF() {
    this.weekService.sendWeeklyPdf().subscribe(
      response => {
        alert(response); 
      },
      error => {
        alert("An error happend while sending PDF. Try again.");
        console.error(error); 
      }
    );
  }

  waitForImagesToLoad(element: HTMLElement): Promise<void> {
    const images = Array.from(element.getElementsByTagName('img')) as HTMLImageElement[];
    const promises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>(resolve => { img.onload = () => resolve(); img.onerror = () => resolve(); });
    });
    return Promise.all(promises).then(() => {});
  }
}

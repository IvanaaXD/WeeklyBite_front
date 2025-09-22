import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCategory, GetRecipe } from '../../recipe/model/recipe.model';
import { GetWeekDay } from '../model/get-week-day.model';
import { Day } from '../model/week-day.model';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrl: './next-week.component.css'
})
export class NextWeekComponent implements OnInit {

  days = Object.values(Day).filter(value => isNaN(Number(value)));
  meals = Object.values(RecipeCategory).filter(value => isNaN(Number(value)));

  weekStartDate: string = '';
  weekEndDate: string = '';

  weekId: number = 0; 
  dayToWeekDayId: { [day: string]: number } = {};

  weekAvailable: boolean = true; 

  mealPlan: { [meal: string]: { [day: string]: GetRecipe | null } } = {};

  constructor(private weekService: WeekService, private router: Router) {
    this.meals.forEach(meal => {
      this.mealPlan[meal] = {};
      this.days.forEach(day => {
        this.mealPlan[meal][day] = null; 
      });
    });
  }

  ngOnInit(): void {
    this.loadNextWeek();
  }

  loadNextWeek() {
    this.weekService.getNextWeek().subscribe({
      next: week => {
        if (!week || !week.id) {
          this.weekAvailable = false;
          return;
        }

        this.weekAvailable = true;
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
      },
      error: err => {
        console.error('Error loading week:', err);
        this.weekAvailable = false;
      }
    });
  }

  goToRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}`;
  }

  onEmptyCellClick(day: Day | string, meal: RecipeCategory | string) {
    const dayStr = String(day).toLowerCase(); 
    const mealStr = String(meal); 
    const weekDayId = this.dayToWeekDayId[String(day)];

    if (!this.mealPlan[mealStr][dayStr]) {
      this.router.navigate(
        ['/all-recipes', dayStr, mealStr], 
        { queryParams: { weekId: this.weekId, weekDayId: weekDayId } }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCategory, GetRecipe } from '../../recipe/model/recipe.model';
import { GetWeekDay } from '../model/get-week-day.model';
import { Day } from '../model/week-day.model';
import { WeekService } from '../week.service';
import { GetWeek } from '../model/get-week.model';

@Component({
  selector: 'app-past-week',
  templateUrl: './past-week.component.html',
  styleUrl: './past-week.component.css'
})
export class PastWeekComponent implements OnInit {

  days = Object.values(Day).filter(value => isNaN(Number(value)));
  meals = Object.values(RecipeCategory).filter(value => isNaN(Number(value)));

  weekStartDate: string = '';
  weekEndDate: string = '';

  weekId: number = 0; 
  dayToWeekDayId: { [day: string]: number } = {};

  weekAvailable: boolean = true; 

  mealPlan: { [meal: string]: { [day: string]: GetRecipe | null } } = {};

  pastWeeks: GetWeek[] = []; // sve prošle sedmice
  currentWeekIndex = 0; // indeks sedmice koja se trenutno prikazuje

  constructor(private weekService: WeekService, private router: Router) {
    this.meals.forEach(meal => {
      this.mealPlan[meal] = {};
      this.days.forEach(day => {
        this.mealPlan[meal][day] = null; 
      });
    });
  }

  ngOnInit(): void {
    this.weekService.getPastWeeks().subscribe({
      next: (weeks: GetWeek[]) => {
        if (!weeks || weeks.length === 0) {
          this.weekAvailable = false;
          return;
        }

        this.pastWeeks = weeks;
        this.currentWeekIndex = 0; // najnovija prošla sedmica
        this.displayWeek(this.currentWeekIndex);
      },
      error: (err) => {
        console.error('Failed to load past weeks', err);
        this.weekAvailable = false;
      }
    });
  }

  displayWeek(index: number) {
    const week = this.pastWeeks[index];
    this.weekId = week.id;
    this.weekStartDate = week.startDate;
    this.weekEndDate = week.endDate;

    // očisti mealPlan
    this.meals.forEach(meal => this.days.forEach(day => this.mealPlan[meal][day] = null));

    // popuni mealPlan
    week.weekDays.forEach((weekDay: GetWeekDay) => {
      const day = weekDay.day;
      this.dayToWeekDayId[day] = weekDay.id;
      weekDay.recipes.forEach(recipe => {
        const meal = recipe.category;
        this.mealPlan[meal][day] = recipe;
      });
    });
  }

  previousWeek(event: Event) {
    event.preventDefault(); // <--- ovo sprečava "href=#" da refresuje stranicu
    if (this.currentWeekIndex < this.pastWeeks.length - 1) {
      this.currentWeekIndex += 1;
      this.displayWeek(this.currentWeekIndex);
    }
  }

  nextWeek(event: Event) {
    event.preventDefault();
    if (this.currentWeekIndex > 0) {
      this.currentWeekIndex -= 1;
      this.displayWeek(this.currentWeekIndex);
    }
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
}

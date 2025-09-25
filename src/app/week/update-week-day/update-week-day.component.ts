import { Component, Inject, OnInit } from '@angular/core';
import { RecipeCategory } from '../../recipe/model/recipe.model';
import { Day } from '../model/week-day.model';
import { UpdateWeekDay } from '../model/update-week-day.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeekDayService } from '../week-day.service';
import { WeekService } from '../week.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetWeekDay } from '../model/get-week-day.model';
import { GetWeek } from '../model/get-week.model';

@Component({
  selector: 'app-update-week-day',
  templateUrl: './update-week-day.component.html',
  styleUrl: './update-week-day.component.css'
})
export class UpdateWeekDayComponent implements OnInit{
  submitted = false;

  recipeCategory: string = '';
  recipeId: number = 0;
  weekDayId: number = 0;

  formModel = {
    day: null as GetWeekDay | null,
    category: null as RecipeCategory | null
  };

  days = [];
  categories = [];

  weekRange: string = '';
  weekDays: GetWeekDay[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<UpdateWeekDayComponent>,
    public weekDayService: WeekDayService,
    public weekService: WeekService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: number; recipeCategory: RecipeCategory }
  ) {}

  ngOnInit(): void {
    this.recipeId = this.data.recipeId;
    this.recipeCategory = String(this.data.recipeCategory);

    this.loadNextWeek();
  }

  loadNextWeek() {
    this.weekService.getNextWeek().subscribe({
      next: (week: GetWeek) => {
        this.weekRange = `${new Date(week.startDate).toLocaleDateString()} - ${new Date(week.endDate).toLocaleDateString()}`;

        this.weekDays = week.weekDays.filter(day =>
          !day.recipes?.some(r =>
            r.id === this.recipeId && String(r.category) === this.recipeCategory
          )
        );
      },
      error: (err) => {
        console.error("Failed to load next week", err);
      }
    });
  }

  setWeekRange() {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) + 7); 

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    this.weekRange = `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.formModel.day) {
      console.warn('No day selected');
      return;
    }

    const selectedDay = this.formModel.day; 

    const updateWeekDay: UpdateWeekDay = {
      id: selectedDay.id,
      recipeCategory: this.recipeCategory as unknown as RecipeCategory,
      recipeId: this.recipeId,
    };


    this.weekDayService.update(updateWeekDay, selectedDay.id).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error updating week day:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

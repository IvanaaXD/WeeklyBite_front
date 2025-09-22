import { Component, Inject, OnInit } from '@angular/core';
import { RecipeCategory } from '../../recipe/model/recipe.model';
import { Day } from '../model/week-day.model';
import { UpdateWeekDay } from '../model/update-week-day.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeekDayService } from '../week-day.service';
import { WeekService } from '../week.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    day: null as Day | null,
    category: null as RecipeCategory | null
  };

  days = Object.values(Day);
  categories = Object.values(RecipeCategory);

  weekRange: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateWeekDayComponent>,
    public weekDayService: WeekDayService,
    public weekService: WeekService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: number; recipeCategory: RecipeCategory }
  ) {}

  ngOnInit(): void {
    this.setWeekRange();

    this.recipeId = this.data.recipeId;
    this.recipeCategory = String(this.data.recipeCategory);
  }

  setWeekRange() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = nedelja, 1 = ponedeljak...
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) + 7); // sljedeći ponedeljak

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    this.weekRange = `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.formModel.day || !this.formModel.category) return;
    console.log('Form data:', this.formModel);

    const updateWeekDay: UpdateWeekDay = {
      id: this.weekDayId,
      recipeCategory: this.recipeCategory as unknown as RecipeCategory,
      recipeId: this.recipeId,
    };

    this.weekDayService.update(updateWeekDay, this.weekDayId).subscribe({
      next: (updatedWeekDay) => {
        this.router.navigate(['/my-recipes-page']);
      },
      error: (err) => {
        console.error('Error updating week day:', err);
      }
    });
  }

  onCancel() {
    console.log('Popup closed');
  }
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetRecipe } from '../../../recipe/model/recipe.model';
import { RecipeService } from '../../../recipe/recipe.service';

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.css']
})
export class RecipeFilterComponent implements OnInit {

  filterForm: FormGroup = new FormGroup({});
  filteredRecipes: GetRecipe[] = [];

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private service: RecipeService) {}

  ngOnInit(): void {
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

    this.service.getAll(0,4 ).subscribe(res => {
      this.filteredRecipes = res.content;
    });
  }

  onApply(): void {
    const filters = {
      ...this.filterForm.value,
      page: 0,
      size: 4
    };
    this.filtersChanged.emit(filters);
  }

  onReset(): void {
    this.filterForm.reset({
      breakfast: true,
      lunch: true,
      dinner: true,
      dessert: true,
      snack: true,
      duration: '',
      content: '',
      numberOfPeople: '',
      name: '',
      description: ''
    });
    this.filtersChanged.emit(this.filterForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weekly-ingredients',
  templateUrl: './weekly-ingredients.component.html',
  styleUrls: ['./weekly-ingredients.component.css']
})
export class WeeklyIngredientsComponent implements OnInit {

  ingredients: { name: string, quantity: number, unit: string }[] = [];
  weekId: number = 0; 

  constructor(private ingredientService: IngredientService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('weekId');
      if (id) {
        this.weekId = +id; 
        this.loadIngredients();
      }
    });
  }

  loadIngredients(): void {
    this.ingredientService.getIngredientsByWeek(this.weekId).subscribe(data => {
      this.ingredients = data;
      console.log(this.ingredients);
    }, error => {
      console.error('Error while loading ingredients', error);
    });
  }
}

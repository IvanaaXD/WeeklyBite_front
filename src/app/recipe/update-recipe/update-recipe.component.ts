import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { GetIngredient } from '../../ingredient/model/ingredient.model';
import { RecipeStateService } from '../recipe-state.service';
import { RecipeService } from '../recipe.service';
import { CreateRecipe } from '../model/create-recipe.model';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.css'
})
export class UpdateRecipeComponent {
  recipeForm: FormGroup;
  categories: string[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT', 'SNACK'];
  selectedFiles: File[] = [];
  recipeId: number = -1;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private stateService: RecipeStateService, private recipeService: RecipeService, private route: ActivatedRoute) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(10)]],
      people: [1, [Validators.required, Validators.min(1)]],
      ingredients: this.fb.array([])
    });

    for (let i = 0; i < 3; i++) {
      this.addIngredient();
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    const state = this.stateService.getRecipe();

    if (state && this.stateService.getRecipeId() === this.recipeId) {
      this.patchForm(state);
    } else {
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.stateService.setRecipe(recipe);
          this.patchForm(recipe);
        },
        error: (err) => console.error(err)
      });
    }
  }

  private patchForm(recipe: any) {
    this.recipeForm.patchValue({
      title: recipe.name,
      category: recipe.category,
      content: recipe.content,
      duration: recipe.duration,
      people: recipe.numberOfPeople
    });

    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.clear();
    recipe.products.forEach((prod: { name: any; quantity: any; unit: any; }) => {
      ingredientsArray.push(this.fb.group({
        name: [prod.name],
        quantity: [prod.quantity],
        unit: [prod.unit]
      }, { validators: this.ingredientValidator }));
    });
  }

  addIngredient() {
    const group = this.fb.group({
      name: [''],
      quantity: [0],
      unit: ['']
    }, { validators: this.ingredientValidator }); 
    this.ingredients.push(group);
  }

  ingredientValidator(control: AbstractControl) {
    const name = control.get('name')?.value;
    const quantity = control.get('quantity')?.value;
    const unit = control.get('unit')?.value;

    if (!name && !quantity && !unit) return null;

    const errors: any = {};
    if (!name) errors.nameRequired = true;
    if (!unit) errors.unitRequired = true;
    if (quantity < 1) errors.quantityInvalid = true;

    return Object.keys(errors).length ? errors : null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedFiles.push(input.files[i]);
      }
    }
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const ingredients: GetIngredient[] = this.ingredients.controls
      .filter(control => {
        const name = control.get('name')?.value?.trim();
        const quantity = Number(control.get('quantity')?.value);
        const unit = control.get('unit')?.value?.trim();

        return name || quantity || unit; 
      })
      .map((control, index) => ({
        id: index + 1,
        name: control.get('name')?.value || '',
        quantity: Number(control.get('quantity')?.value) || 0,
        unit: control.get('unit')?.value || ''
      }));

    const recipeData: CreateRecipe = {
      name: this.recipeForm.value.title,
      content: this.recipeForm.value.content,
      description: this.stateService.getRecipe()?.description || [],
      duration: this.recipeForm.value.duration,
      numberOfPeople: this.recipeForm.value.people,
      adminId: Number(this.authService.getUserIdFromToken()), 
      category: this.recipeForm.value.category,
      pictures: [], 
      products: ingredients 
    };

    this.stateService.setRecipe(recipeData);
    this.stateService.setPictures(this.selectedFiles); 
    this.stateService.setRecipeId(this.recipeId);

    this.router.navigate(['/update-description', this.recipeId]);
  }

  goBack() {
    this.router.navigate(['/recipes']);
  }
}

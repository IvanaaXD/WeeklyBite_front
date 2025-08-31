import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IngredientService } from '../../ingredient/ingredient.service';
import { RecipeCategory, Step } from '../model/recipe.model';
import { RecipeStateService } from '../recipe-state.service';
import { RecipeService } from '../recipe.service';
import { UpdateRecipe } from '../model/recipe.model';


@Component({
  selector: 'app-update-description',
  templateUrl: './update-description.component.html',
  styleUrl: './update-description.component.css'
})
export class UpdateDescriptionComponent {
  preparationForm: FormGroup;
  recipeId: number = -1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: RecipeStateService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {
    const state = this.stateService.getRecipe();
    this.recipeId = this.stateService.getRecipeId();
    console.log(state);
    console.log(this.stateService.getPictures())
    let initialSteps: any[] = [];

    if (state && Array.isArray(state.description) && state.description.length > 0) {
      initialSteps = state.description.map((step: any) =>
        this.fb.group({
          name: [step.name || ''],
          description: [step.description || '']
        })
      );
    }

    if (initialSteps.length === 0) {
      initialSteps = [this.createStep(), this.createStep()];
    }

    initialSteps.push(this.createStep())
    this.preparationForm = this.fb.group(
      { steps: this.fb.array(initialSteps) },
      { validators: this.atLeastOneValidator }
    );
  }

  get steps(): FormArray {
    return this.preparationForm.get('steps') as FormArray;
  }

  createStep(name: string = '', description: string = ''): FormGroup {
    return this.fb.group(
      { name: [name], description: [description] },
      { validators: this.bothRequiredValidator } 
    );
  }

  addStep() {
    this.steps.push(this.createStep());
  }

  bothRequiredValidator(group: AbstractControl): ValidationErrors | null {
    const name = group.get('name')?.value?.trim();
    const description = group.get('description')?.value?.trim();
    if ((name && !description) || (!name && description)) return { bothRequired: true };
    return null;
  }

  atLeastOneValidator(group: AbstractControl): ValidationErrors | null {
    const steps = (group.get('steps') as FormArray).controls;
    const validStep = steps.some(step => step.get('name')?.value && step.get('description')?.value);
    return validStep ? null : { atLeastOne: true };
  }

  onSubmit() {
    if (this.preparationForm.invalid) {
      this.preparationForm.markAllAsTouched();
      return;
    }

    const state = this.stateService.getRecipe();
    const pictures = this.stateService.getPictures();

    if (state && pictures) {
      const ingredients = state.products;

      const ingredientObservables = ingredients.map(ing => this.ingredientService.add(ing));

      forkJoin(ingredientObservables).subscribe({
        next: (addedIngredients) => {

          this.setDescription();
          state.products = addedIngredients;
          
          const updateRecipe = this.convertToDto();

          this.recipeService.update(updateRecipe, this.stateService.getPictures()).subscribe({
            next: createdRecipe => {
              console.log('Recipe updated successfully:', createdRecipe);
              this.router.navigate(['/recipes']);
            },
            error: err => console.error(err)
          });

        },
        error: (err) => console.error('Error adding ingredients:', err)
      });
    }
  }

  goBack() {
    this.setDescription();
    this.router.navigate(['/update-recipe', this.recipeId]);
  }

  setDescription() {
    const state = this.stateService.getRecipe();
    if (state) {
      const steps: Step[] = this.preparationForm.value.steps
        .filter((s: { name: string; description: string }) => s.name?.trim() && s.description?.trim())
        .map((s: { name: string; description: string }) => new Step(s.name.trim(), s.description.trim()));

      state.description = steps;
      this.stateService.setRecipe(state);
    }
  }

  convertToDto(): UpdateRecipe {
    const state = this.stateService.getRecipe();
    return {
      id: this.stateService.getRecipeId(),
      name: state?.name || '',
      content: state?.content || '',
      description: state?.description || [],
      duration: state?.duration || 0,
      numberOfPeople: state?.numberOfPeople || 0,
      category: state?.category || RecipeCategory.BREAKFAST,
      pictures: [],
      products: state?.products || []
    }
  }
}

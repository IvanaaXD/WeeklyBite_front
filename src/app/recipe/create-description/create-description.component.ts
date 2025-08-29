import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeStateService } from '../recipe-state.service';
import { IngredientService } from '../../ingredient/ingredient.service';
import { RecipeService } from '../recipe.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-description',
  templateUrl: './create-description.component.html',
  styleUrls: ['./create-description.component.css']
})
export class CreateDescriptionComponent {
  preparationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: RecipeStateService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {
    const state = this.stateService.getRecipe();
    console.log(state);

    let initialSteps: any[] = [];

    if (state?.description && state.description.trim() !== '') {
      const regex = /<b>(.*?)<\/b>([^<]*)/g;
      let match;
      while ((match = regex.exec(state.description)) !== null) {
        initialSteps.push(this.fb.group({
          name: [match[1] || ''],
          description: [match[2].trim() || '']
        }));
      }
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

          this.recipeService.add(state, pictures).subscribe({
            next: createdRecipe => {
              console.log('Recipe created successfully:', createdRecipe);
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
    this.router.navigate(['/create-recipe']);
  }

  setDescription() {
    const state = this.stateService.getRecipe();
    if (state) {
      const stepsHtml = this.preparationForm.value.steps
        .map((step: { name: string; description: string }) => {
          const nameHtml = step.name ? `<b>${step.name}</b>` : '';
          const descHtml = step.description ? ` ${step.description}` : '';
          return nameHtml + descHtml;
        })
        .join('<br>'); 

      state.description = stepsHtml;

      this.stateService.setRecipe(state);
    }
  }
}

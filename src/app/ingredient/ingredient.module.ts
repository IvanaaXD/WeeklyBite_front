import { NgModule } from "@angular/core";
import { WeeklyIngredientsComponent } from "./weekly-ingredients/weekly-ingredients.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthModule } from "../infrastructure/auth/auth.module";
import { MaterialModule } from "../infrastructure/material/material.module";
import { LayoutModule } from "../layout/layout.module";
import { UserModule } from "../user/user.module";

@NgModule({
  declarations: [
    WeeklyIngredientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule,
    FormsModule,
    LayoutModule,
    UserModule
  ]
  })
export class IngredientModule { }
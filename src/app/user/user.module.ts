import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RightPanelComponent } from './user-profile/right-panel/right-panel.component';
import { LeftPanelComponent } from './user-profile/left-panel/left-panel.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { UserCardComponent } from './user-profile/user-card/user-card.component';
import { FavoriteRecipesComponent } from './user-profile/favorite-recipes/favorite-recipes.component';
import { UpdateUserComponent } from './user-profile/update-user/update-user.component';
import { UpdatePasswordComponent } from './user-profile/update-password/update-password.component';
import { ConfirmDeactivationComponent } from './user-profile/confirm-deactivation/confirm-deactivation.component';
import { WeeklyRecipesComponent } from '../recipe/weekly-recipes/weekly-recipes.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RightPanelComponent,
    LeftPanelComponent,
    ProfileComponent,
    UserCardComponent,
    FavoriteRecipesComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    ConfirmDeactivationComponent,
    WeeklyRecipesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AuthModule,
    FormsModule
  ]
})
export class UserModule { }
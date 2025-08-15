import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarAuComponent } from './nav-bar-au/nav-bar-au.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { MaterialModule } from '../infrastructure/material/material.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    NavBarAuComponent 
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    HomeComponent,
    NavBarAuComponent,
  ]
})
export class LayoutModule { }
import { NgModule } from "@angular/core";
import { WeeklyHistoryComponent } from "./weekly-history/weekly-history.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthModule } from "../infrastructure/auth/auth.module";
import { MaterialModule } from "../infrastructure/material/material.module";
import { LayoutModule } from "../layout/layout.module";
import { UserModule } from "../user/user.module";
import { UpdateWeekDayComponent } from './update-week-day/update-week-day.component';
import { NextWeekComponent } from './next-week/next-week.component';

@NgModule({
  declarations: [
    WeeklyHistoryComponent,
    UpdateWeekDayComponent,
    NextWeekComponent
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
export class WeekModule { }
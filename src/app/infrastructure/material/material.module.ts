import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCheckboxModule, 
    MatRadioModule, 
    MatIconModule, 
    FormsModule, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatSliderModule, 
    MatSelectModule, 
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatCalendar
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCheckboxModule, 
    MatRadioModule, 
    MatIconModule, 
    FormsModule, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatSliderModule, 
    MatSelectModule, 
    MatChipsModule,
    MatCalendar
  ]
})
export class MaterialModule { }
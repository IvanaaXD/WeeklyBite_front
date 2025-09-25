import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { AdminCommentComponent } from './admin-comment/admin-comment.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    CreateCommentComponent,
    AdminCommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    CreateCommentComponent,
  ]
})
export class CommentModule { }

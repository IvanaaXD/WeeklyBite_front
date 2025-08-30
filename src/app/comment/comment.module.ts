import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './popup/confirm-delete/confirm-delete.component';
import { ConfirmApproveComponent } from './popup/confirm-approve/confirm-approve.component';

import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ApproveCommentComponent } from './approve-comment/approve-comment.component';
import { AdminCommentComponent } from './admin-comment/admin-comment.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    CreateCommentComponent,
    ApproveCommentComponent,
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
    ApproveCommentComponent
  ]
})
export class CommentModule { }

import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../comment/comment.service';
import { CommentDTO } from '../model/comment.model';
import { ConfirmApproveComponent } from '../popup/confirm-approve/confirm-approve.component';
import { ConfirmDeleteComponent } from '../popup/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrl: './admin-comment.component.css'
})
export class AdminCommentComponent implements OnInit {
  comments: CommentDTO[] = [];
  displayedColumns: string[] = ['select', 'userFullName', 'userEmail','content', 'commentedEntity', 'dateCreated', 'commentStatus'];
  selectedComment: CommentDTO | null = null;

  noComments: boolean = false;
  
  constructor(
    private commentService: CommentService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.loadComments();
  }
  
  onApproveComment(): void {
    if (!this.selectedComment) return;

    const dialogRef = this.dialog.open(ConfirmApproveComponent, {
      width: '400px',
      data: {
        id: this.selectedComment.id,
        content: this.selectedComment.content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.updateComment(this.selectedComment!.id, 'APPROVED').subscribe(() => {
          this.loadComments();
          this.selectedComment = null;
        });
      }
    });
  }

  onDeleteComment(): void {
    if (!this.selectedComment) return;

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        id: this.selectedComment.id,
        content: this.selectedComment.content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.updateComment(this.selectedComment!.id, 'DELETED').subscribe(() => {
          this.loadComments();
          this.selectedComment = null;
        });
      }
    });
}

  loadComments(): void {
    this.commentService.getComments().subscribe({
      next: (data) => {
        console.log('Data received from backend:', data);
        this.comments = data.map((comment: any) => ({
        id: comment.id,
        name: "Anonymous",
        content: comment.content,
        recipe: comment.recipeName,
        category: "General",
        rating: 0,
        avatar: "assets/images/john_doe.jpg",
        date: comment.dateCreated,
        commentStatus: comment.commentStatus,
        isRecipeCommented: comment.isRecipeCommented,
        email: comment.userEmail,
        userFullName: comment.userFullName
      }));

        if (this.comments.length === 0) {
          this.noComments = true;  
        }
      },
      error: (err) => console.error('Error fetching comments:', err),
    });
  }

  selectComment(comment: CommentDTO, event: any): void {
    this.selectedComment = event.checked ? comment : null;
  }
}

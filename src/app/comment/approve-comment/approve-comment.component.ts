import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { User } from '../../user/model/user.model';
import { ConfirmApproveComponent } from '../popup/confirm-approve/confirm-approve.component';
import { ConfirmDeleteComponent } from '../popup/confirm-delete/confirm-delete.component';
import { CommentDTO } from '../model/comment.model';

@Component({
  selector: 'app-approve-comment',
  templateUrl: './approve-comment.component.html',
  styleUrl: './approve-comment.component.css'
})
export class ApproveCommentComponent {
openUserCard(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}
  comments: CommentDTO[] = [];
  showModal: boolean = false;
  noComments: boolean = false;
  selectedUser: User | null = null;

  constructor(private dialog: MatDialog, private commentService: CommentService) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentService.getComments().subscribe({
      next: (data) => {
        console.log('Data received from backend:', data);
        this.comments = data.map((comment: any) => (
        {
        id: comment.id,
        name: "Anonymous", 
        content: comment.content,  
        service: "Unknown Service",  
        category: "General",  
        rating: 0, 
        avatar: "assets/images/john_doe.jpg", 
        date: comment.date,
        commentStatus: comment.commentStatus,
        isRecipeCommented: comment.isRecipeCommented,
        email:comment.userEmail,
        recipe:comment.recipeName,
        userFullName: comment.userFullName

      })).filter((comment: any) => comment.commentStatus !== 'DELETED');
    
        if (this.comments.length === 0) {
          this.noComments = true;  // we set the indicator that there are no comments
        }
      },
      error: (err) => console.error('Error fetching comments:', err),
    });
  }
    
  approveComment(id: number): void {
    this.commentService.updateComment(id, 'APPROVED').subscribe({
      next: () => {
        console.log(`Comment ${id} approved`);
        this.comments = this.comments.map((comment) =>
          comment.id === id ? { ...comment, commentStatus: 'APPROVED' } : comment
        );
      },
      error: (err) => console.error(`Error approving comment ${id}:`, err),
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        console.log(`Comment ${id} deleted`);
        this.comments = this.comments.filter((comment) => comment.id !== id);
        if (this.comments.length === 0) {
          this.noComments = true;  
        }
      },
      error: (err) => console.error(`Error deleting comment ${id}:`, err),
    });
  }

  approve(id: number, content: string): void {
    const dialogRef = this.dialog.open(ConfirmApproveComponent, {
      data: { id, content }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approveComment(id);
      }
    });
  }

  delete(id: number, content: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { id, content }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(id);
      }
    });
  }

  // openUserCard(userEmail: string, userFullName: string) {
  //   const dialogRef = this.dialog.open(UserProfilePopupComponent, { data: { userEmail, userFullName } })
  // }
  
  closeUserCard() {
    this.showModal = false;
  }
}
  

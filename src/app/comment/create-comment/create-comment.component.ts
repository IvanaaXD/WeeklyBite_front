import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  
  rating: number = 0;

  @ViewChild('commentInput') commentInput!: ElementRef<HTMLTextAreaElement>;

  constructor(private dialogRef: MatDialogRef<CreateCommentComponent>) {}

  rate(stars: number): void {
    this.rating = stars;
  }

  addComment(): void {
    const commentText = this.commentInput.nativeElement.value.trim();

    if (!commentText) {
      alert('Please write a comment.');
      return;
    }

    if (this.rating === 0) {
      alert('Please provide a rating.');
      return;
    }

    const newComment = {
      content: commentText,
      rating: this.rating
    };

    this.dialogRef.close(newComment);  
  }

  closePopup(): void {
    this.dialogRef.close(null);  
  }
}

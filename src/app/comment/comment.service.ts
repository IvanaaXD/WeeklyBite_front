import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateComment, CreatedComment, GetComment, CommentDTO } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  
  private apiUrl = environment.apiHost + '/api/comments'; 
  
  constructor(private httpClient: HttpClient) {}

  add(comment: CreateComment): Observable<CreatedComment> {
    return this.httpClient.post<CreatedComment>(this.apiUrl, comment);  
  }

  delete(categoryId: number) {
    return this.httpClient.delete(this.apiUrl + '/' + categoryId)
  }

  getComments(): Observable<CommentDTO[]> {
    return this.httpClient.get<CommentDTO[]>(this.apiUrl);
  }

  getCommentsByRecipeId(recipeId: number): Observable<GetComment[]> {
    return this.httpClient.get<GetComment[]>(`${this.apiUrl}/recipe/${recipeId}`);
  }

  updateComment(id: number, status: string, text?: string): Observable<CommentDTO> {
    return this.httpClient.put<CommentDTO>(`${this.apiUrl}/${id}`, {
      text: text || undefined, 
      commentStatus: status,
    });
  }
  
  deleteComment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting comment:', error);
        return throwError(() => new Error('Failed to delete comment'));
      })
    );
  }
}

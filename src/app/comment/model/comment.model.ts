export interface CommentDTO {
  id: number;
  name: string;
  content: string;
  commentStatus: string;
  recipe: string;
  category: string;
  rating: number;
  avatar: string;
  isRecipeCommented:boolean;
  email: string;
  userFullName:string;

}

export interface ShowComment {
  author: string,
  avatar: string, 
  text: string,
  recipe: string,
  category: string,
  rating: number
}

export interface GetComment {
  id: number;
  content: string;
  dateCreated: Date;
  commentStatus: CommentStatus;
  userFullName: string;
  userEmail: string;
  recipeId: number;
}

export interface CreateComment {
  content: string;
  userEmail: string;
  recipeId: number;
  rating: number;
}

export interface CreatedComment {
  id:number;
  content: string;
  userEmail: string;
  date: Date;
  recipeId: number;
  commentStatus:CommentStatus;
  rating: number;
}

export enum CommentStatus{
  APPROVED,
  PENDING,
  DELETED
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { GetRecipe, RecipeCategory, Step } from '../model/recipe.model';
import { CreateComment, GetComment, ShowComment } from '../../comment/model/comment.model';
import { CommentService } from '../../comment/comment.service';
import { GetIngredient } from '../../ingredient/ingredient.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { CreateCommentComponent } from '../../comment/create-comment/create-comment.component';
import { User } from '../../user/model/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  isLoggedIn = false;
  isAdmin = false;
  userEmail: string = '';

  currentImageIndex = 0;
  isFavorite = false;
  carouselWidth: number = 0;
  carouselHeight: number = 0;

  imageUrls: string[] = [];
  recipeId: number = 0;
  adminId: number = 0;

  showComments: ShowComment[] = [];
  comments: GetComment[] = [];

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    profilePicture: '',
    birthLocation: '',
    phoneNumber: '',
    email: '',
    role: ''
  };

  recipe = {
    id: 0,
    name: '',
    content: '',
    description: [] as Step[],
    duration: 0,
    numberOfPeople: 0,
    adminId: 0,
    category: RecipeCategory.BREAKFAST, 
    pictures: [] as string[],
    products: [] as GetIngredient[]
  };

  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private commentService: CommentService,
      private router: Router,
      private dialog: MatDialog,
      private authService: AuthService,
      private userService: UserService
    ) { }

  ngOnInit(): void {

    this.userEmail = this.authService.getUserEmailFromToken() || '';
    this.isLoggedIn = this.authService.isLoggedIn(); 

    const role = this.authService.getRole();
    this.isAdmin = role === 'ROLE_ADMIN';

    this.userService.getUserDetails(this.userEmail).pipe(
      catchError(error => {
        console.error('Error while fetching user details:', error);
        this.router.navigate(['/error']);
        return throwError(() => new Error('Failed to load user details'));
      })
    ).subscribe({
      next: (data: User) => {
        this.user = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture,
          birthLocation: data.birthLocation,
          phoneNumber: data.phoneNumber,
          email: data.email,
          role: data.role,
        };
        console.log('Logged-in user:', this.user);
      }})        

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.recipeId = Number(idParam);
      this.loadRecipeAndComments();
    } else {
      console.error('Recipe ID is not provided in the route.');
      this.router.navigate(['/error']);
    }
  }

  private loadRecipeAndComments(): void {
    this.recipeService.getRecipeById(this.recipeId).pipe(
      switchMap((foundedRecipe: GetRecipe) => {

        this.imageUrls = foundedRecipe.pictures || [];
        this.calculateCarouselSize();

        this.adminId = foundedRecipe.adminId;

        this.recipe = {
          id: foundedRecipe.id,
          name: foundedRecipe.name,
          content: foundedRecipe.content,
          description: foundedRecipe.description,
          duration: foundedRecipe.duration,
          numberOfPeople: foundedRecipe.numberOfPeople,
          adminId: foundedRecipe.adminId,
          category: foundedRecipe.category,
          pictures: foundedRecipe.pictures,
          products: foundedRecipe.products
        };

        return this.commentService.getCommentsByRecipeId(this.recipeId).pipe(
          map((fetchedGetComments: GetComment[]) => {
            this.comments = fetchedGetComments;
            return fetchedGetComments.map(getComment => ({
              author: getComment.userFullName,
              avatar: 'assets/images/default-avatar.png',
              text: getComment.content,
              recipe: '',
              category: this.recipe.category.toString(),                
              rating: 0
            } as ShowComment));
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching recipe or comments:', error);
        this.router.navigate(['/error']);
        return throwError(() => new Error('Failed to load recipe or comments'));
      })
    ).subscribe((mappedShowComments: ShowComment[]) => {
      this.showComments = mappedShowComments;
      console.log('Fetched and mapped comments:', this.showComments);
    });
  }

  calculateCarouselSize(): void {
    if (this.imageUrls.length === 0) {
      this.carouselWidth = 0;
      this.carouselHeight = 0;
      return;
    }
    const promises = this.imageUrls.map(src => this.getImageSize(src));
    Promise.all(promises).then(sizes => {
      this.carouselWidth = Math.max(...sizes.map(size => size.width));
      this.carouselHeight = Math.max(...sizes.map(size => size.height));
    });
  }

  getImageSize(src: string): Promise<{ width: number; height: number }> {
    return new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        resolve({ width: img.naturalWidth * 7 / 10, height: img.naturalHeight * 7 / 10 });
    });
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
  }

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.imageUrls.length;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  addToFavorites() {
    console.log('Added to favorites');
  }


  openCommentPopup(): void {
    const dialogRef = this.dialog.open(CreateCommentComponent, {
      width: '500px',
      data: {
        serviceName: this.recipe.name,
        userEmail: this.userEmail
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const createComment: CreateComment = {
          content: result.content,
          rating: result.rating,
          userEmail: this.userEmail,
          recipeId: this.recipeId, 
        };

        this.commentService.add(createComment).subscribe({
          next: (savedComment) => console.log('Comment saved:', savedComment),
          error: (err) => {
            console.error('Failed to save comment:', err);
            alert('Failed to add comment. Please try again.');
          }
        });
      }
    });
  }

  addComment(newComment: { text: string, rating: number }): void {
    if (!this.userEmail) {
      console.warn('Cannot add comment: User not logged in or user ID is missing.');
      alert('You must be logged in to add a comment.');
      return;
    }

    if (newComment) {
      const commentToAdd: ShowComment = {
        author: `${this.user.firstName} ${this.user.lastName}`,
        avatar: this.user.profilePicture || 'assets/images/default-avatar.png',
        recipe: this.recipe.name,
        category: this.recipe.category.toString(),
        text: newComment.text,
        rating: newComment.rating
      };
      this.showComments.push(commentToAdd);
      console.log('New comment added:', commentToAdd);

    } else {
      console.warn('Cannot add comment: newComment data is missing.');
    }
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}

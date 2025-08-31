import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent {

  constructor(private dialogRef: MatDialogRef<DeleteRecipeComponent>) {}

  deleteRecipe() {
    document.body.style.overflow = "auto";
    this.dialogRef.close(true);  
  }

  closePopup() {
    document.body.style.overflow = "auto";
    this.dialogRef.close(false); 
  }
}

import { OnInit, ViewEncapsulation, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, content: string }
  ) {}

  onDelete(): void {
    this.dialogRef.close(true); // Prosleđuje 'true' ako je korisnik potvrdio
  }

  onCancel(): void {
    this.dialogRef.close(false); // Prosleđuje 'false' ako je korisnik odustao
  }
}

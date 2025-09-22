import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deactivation',
  templateUrl: './confirm-deactivation.component.html',
  styleUrl: './confirm-deactivation.component.css'
})
export class ConfirmDeactivationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeactivationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

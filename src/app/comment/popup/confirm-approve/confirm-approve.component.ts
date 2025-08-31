import { OnInit, ViewEncapsulation, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-approve',
  templateUrl: './confirm-approve.component.html',
  styleUrl: './confirm-approve.component.css'
})
export class ConfirmApproveComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, content: string }
  ) {}

  onApprove(): void {
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}

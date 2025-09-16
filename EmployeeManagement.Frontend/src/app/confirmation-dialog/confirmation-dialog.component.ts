import { Component, Inject, AfterViewInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="warning-icon">
          <mat-icon>warning_amber</mat-icon>
        </div>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      <mat-dialog-content class="dialog-content">
        <p class="dialog-message">{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions class="dialog-actions">
        <button mat-button class="cancel-button" (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button
          mat-raised-button
          color="warn"
          class="confirm-button"
          (click)="onConfirm()"
        >
          {{ data.confirmText || 'Confirm' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        min-width: 400px;
        max-width: 500px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 0;
      }

      .warning-icon {
        background: #fff3cd;
        border: 2px solid #ffc107;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        flex-shrink: 0;
      }

      .warning-icon mat-icon {
        color: #856404;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      h2[mat-dialog-title] {
        margin: 0;
        font-weight: 600;
        font-size: 20px;
        color: #212529;
        line-height: 1.3;
      }

      .dialog-content {
        padding: 0 0 24px 0;
        margin: 0;
      }

      .dialog-message {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: #6c757d;
      }

      .dialog-actions {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .cancel-button {
        min-width: 80px;
        height: 40px;
        border-radius: 8px;
        font-weight: 500;
        background-color: transparent !important;
        color: #6c757d !important;
        border: 1px solid #dee2e6 !important;
      }

      .cancel-button:hover {
        background-color: #f8f9fa !important;
        color: #495057 !important;
        border-color: #adb5bd !important;
      }

      .cancel-button:focus-visible {
        background-color: #f8f9fa !important;
        color: #495057 !important;
        border-color: #80bdff !important;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
        outline: none;
      }

      .cancel-button:focus:not(:focus-visible) {
        background-color: transparent !important;
        color: #6c757d !important;
        border-color: #dee2e6 !important;
        box-shadow: none !important;
        outline: none;
      }

      .cancel-button:active {
        background-color: #e9ecef !important;
        color: #495057 !important;
        border-color: #adb5bd !important;
      }

      .confirm-button {
        min-width: 80px;
        height: 40px;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
      }

      .confirm-button:hover {
        box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
      }

      .confirm-button:focus-visible {
        outline: 2px solid #dc3545;
        outline-offset: 2px;
      }

      .confirm-button:focus:not(:focus-visible) {
        outline: none;
      }

      /* Override Angular Material dialog padding */
      ::ng-deep .mat-mdc-dialog-container .mdc-dialog__surface {
        padding: 24px !important;
      }
    `,
  ],
})
export class ConfirmationDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}

  ngAfterViewInit(): void {
    // Remove focus from any focused element to prevent automatic button focus
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
    }, 0);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

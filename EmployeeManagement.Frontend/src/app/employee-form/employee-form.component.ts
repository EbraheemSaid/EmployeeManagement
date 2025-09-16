import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { EmployeeService } from '../services/employee.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  isEditMode = false;
  departments = [
    { value: Department.Engineering, label: 'Engineering' },
    { value: Department.Marketing, label: 'Marketing' },
    { value: Department.Finance, label: 'Finance' },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      position: ['', [Validators.required, Validators.maxLength(100)]],
      salary: [0, [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      department: [Department.Engineering, [Validators.required]],
    });

    if (data) {
      this.isEditMode = true;
      this.employeeForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      if (this.data && this.data.id !== undefined) {
        this.employeeService.updateEmployee(this.data.id, employee).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error updating employee', error);
            alert('Error updating employee: ' + (error.message || error));
          },
        });
      } else {
        this.employeeService.createEmployee(employee).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error creating employee', error);
            alert('Error creating employee: ' + (error.message || error));
          },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onPhoneNumberInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
    input.value = value;
    this.employeeForm.get('phoneNumber')?.setValue(value);
  }
}

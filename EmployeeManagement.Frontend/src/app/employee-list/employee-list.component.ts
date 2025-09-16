import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { EmployeeService } from '../services/employee.service';
import { PagedResponse } from '../models/paged-response.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'position',
    'salary',
    'phoneNumber',
    'department',
    'actions',
  ];
  loading = false;
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  getDepartmentName(department: Department): string {
    switch (department) {
      case Department.Engineering:
        return 'Engineering';
      case Department.Marketing:
        return 'Marketing';
      case Department.Finance:
        return 'Finance';
      default:
        return 'Unknown';
    }
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService
      .getAllEmployees(this.pageIndex + 1, this.pageSize)
      .subscribe({
        next: (response: PagedResponse<Employee>) => {
          this.employees = response.data;
          this.totalItems = response.totalCount;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading employees', error);
          alert('Error loading employees: ' + (error.message || error));
          this.loading = false;
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openEditEmployeeDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      restoreFocus: false,
      data: {
        title: 'Delete Employee',
        message:
          'Are you sure you want to delete this employee? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee', error);

            alert('Error deleting employee: ' + (error.message || error));
          },
        });
      }
    });
  }
}

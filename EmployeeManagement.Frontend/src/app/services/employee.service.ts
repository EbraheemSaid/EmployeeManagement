import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { PagedResponse } from '../models/paged-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getAllEmployees(
    page: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<Employee>> {
    return this.http
      .get<PagedResponse<Employee>>(
        `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  createEmployee(employee: Employee): Observable<{ id: number }> {
    return this.http
      .post<{ id: number }>(this.apiUrl, employee)
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${id}`, employee)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}
Message: ${error.message}`;
      // If we have a more detailed error from the server, use it
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

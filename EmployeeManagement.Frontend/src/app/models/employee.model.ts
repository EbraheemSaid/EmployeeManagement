import { Department } from './department.model';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  phoneNumber: string;
  department: Department;
}

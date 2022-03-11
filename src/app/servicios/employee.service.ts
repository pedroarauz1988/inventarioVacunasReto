import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../modelos/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  public getEmployee() {
    return this.httpClient.get("assets/data/employees.json");
  }

  public putEmployee(newEmployee: Employee) {
    let employees: Employee[] =[] ;
    const employeesCopy : Employee[]= JSON.parse(localStorage.getItem('employees') || '[]');
    if (employeesCopy !== null) {
      employees=employeesCopy.filter(employee=>employee.identification!==newEmployee.identification)
    }
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify( employees));
    console.log(JSON.parse(localStorage.getItem('employees') || '[]'));

  }

}

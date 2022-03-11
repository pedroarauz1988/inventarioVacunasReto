import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/modelos/employee';
import { User } from 'src/app/modelos/user';
import { EmployeeService } from 'src/app/servicios/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = []
  employee: Employee | undefined = {identification: '', name: '', lastName: '', email: '', movil: '', address: '',
  vaccinationStatus: '', vaccineType: {name: '', doses: 0}};
  displayedColumns: string[] = [
    'identification',
    'name',
    'lastName',
    'email',
    'action'
  ];
  ref: any;

  constructor(public dialogService: DialogService, private employeeService: EmployeeService, private formBuilder: FormBuilder) {
               }

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
  }

  filterForm = this.formBuilder.group({
    filter: ['', []],
    vaccinationStatus: ['', []],
    vaccineName: ['', []],
    to: ['', []],
    from: ['', []]

    
  });

  filter() {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
    switch(this.filterForm.value.vaccinationStatus){
      case 'vacunado':
        this.employees = this.employees.filter(employee => employee.vaccinationStatus === this.filterForm.value.vaccinationStatus);
      break;
      case 'noVacunado':
        this.employees = this.employees.filter(employee => employee.vaccinationStatus === this.filterForm.value.vaccinationStatus);
        break;
    }
    switch(this.filterForm.value.vaccineName){
      case 'pfizer':
        this.employees = this.employees.filter(employee => employee.vaccineType.name === this.filterForm.value.vaccineName);
      break;
      case 'Sputnik':
        this.employees = this.employees.filter(employee => employee.vaccineType.name === this.filterForm.value.vaccineName);
        break;
      case 'AstraZeneca':
        this.employees = this.employees.filter(employee => employee.vaccineType.name === this.filterForm.value.vaccineName);
        break;
      case 'Jhonson&Jhonson':
          this.employees = this.employees.filter(employee => employee.vaccineType.name === this.filterForm.value.vaccineName);
          break;
    }
    let to = this.filterForm.value.to;
    let from = this.filterForm.value.from;


  }

  editEmployee(employee: Employee) {
    const employeeFind: Employee | undefined = this.employees.find(emp => emp.identification === employee.identification);
      this.ref = this.dialogService.open(EditEmployeeComponent, {
        showHeader: false,
        closeOnEscape: true,
        data: employeeFind
      });
      this.ref.onClose.subscribe((res: Employee) => {
        if (res) {
          alert('Empleado actualizado correctamente')

        }
      });

  }
  newEmployee() {
    this.ref = this.dialogService.open(EditEmployeeComponent, {
      showHeader: false,
      closeOnEscape: true,
      data: this.employee
    });

  }

  registerEmployee(employee: Employee) {

    const user: User = {userName: employee.name,
      password: employee.identification.toString(),
      identification: employee.identification.toString(),
      roles: [{
        name: 'empleado'
      }]
    }
    const usersStorage: User[] = JSON.parse(localStorage.getItem('users')  || '[]');
    usersStorage.push(user);

    localStorage.setItem('users', JSON.stringify(usersStorage))


  }

  public deleteEmployee(newEmployee: Employee) {
    let employees: Employee[] =[];
    const employeesCopy: Employee[]= JSON.parse(localStorage.getItem('employees') || '[]');
    employees = employeesCopy.filter(employee => employee.identification !== newEmployee.identification)
    localStorage.setItem('employees', JSON.stringify( employees));

    let users: User[] = [];
    const usersCopy: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users = usersCopy.filter(user => user.identification !== newEmployee.identification)
    localStorage.setItem('users', JSON.stringify(users));
    this.ngOnInit();

  }

  listEmployees() {
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employees = res;
      localStorage.setItem('employees', JSON.stringify( this.employees));
    }, error=>{
      alert(error)
    })

  }
  

 




}

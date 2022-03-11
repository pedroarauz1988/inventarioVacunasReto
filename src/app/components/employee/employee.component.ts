import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/modelos/employee';
import { EmployeeService } from 'src/app/servicios/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employee: Employee | undefined = {identification: '', name: '', lastName: '', email: '', movil: '', address: '',
                               vaccinationStatus: '', vaccineType: {name: '', doses: 0}};
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder) { 

    }

    employeeForm = this.formBuilder.group({
      identification: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.email]],
      address: ['', [Validators.required]],
      vaccinationStatus: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      movil: ['', [Validators.required]],
    });

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  get identification () {
    return this.employeeForm.get('identification');
  }

  get name () {
    return this.employeeForm.get('name');
  }

  get lastName () {
    return this.employeeForm.get('lastName');
  }

  get address () {
    return this.employeeForm.get('address');
  }

  get email () {
    return this.employeeForm.get('email');
  }

  get vaccinationStatus () {
    return this.employeeForm.get('vaccinationStatus');
  }

  get birthDate () {
    return this.employeeForm.get('birthDate');
  }
  get movil () {
    return this.employeeForm.get('movil');
  }



  getEmployee(){

    const employees: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    
    this.employee = employees.find(employee => employee.identification === localStorage.getItem('usuario'));
    
    this.employeeForm = this.formBuilder.group({
      name: new FormControl(this.employee?.name),
      identification: new FormControl(this.employee?.identification),
      lastName: new FormControl(this.employee?.lastName),
      email: new FormControl(this.employee?.email, Validators.required),
      movil: new FormControl(this.employee?.movil),
      birthDate: new FormControl(this.employee?.birthDate),
      address: new FormControl(this.employee?.address),
      vaccinationStatus: new FormControl(this.employee?.vaccinationStatus),

      vaccineName: new FormControl(this.employee?.vaccineType?.name),
      vaccinationDate: new FormControl(this.employee?.vaccineType?.vaccinationDate),
      doses: new FormControl(this.employee?.vaccineType?.doses),

    })

  }

  createEmployee(): Employee {

    const newEmployee: Employee = {
      identification: this.employeeForm.value.identification,
      name: this.employeeForm.value.name,
      lastName: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      movil: this.employeeForm.value.movil,
      birthDate: this.employeeForm.value.birthDate,
      address: this.employeeForm.value.address,
      vaccinationStatus: this.employeeForm.value.vaccinationStatus,
      vaccineType: {
        name: this.employeeForm.value.vaccineName,
        vaccinationDate: this.employeeForm.value.vaccinationDate,
        doses:this.employeeForm.value.doses  }
      }
    return newEmployee;

  }

  save() {
    const newEmployee: Employee = this.createEmployee();
    this.employeeService.putEmployee(newEmployee);
  }

}

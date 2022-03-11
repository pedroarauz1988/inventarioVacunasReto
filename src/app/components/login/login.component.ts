import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modelos/user';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  userName: string = '';
  password: string = '';
  constructor(private loginService: LoginService,  private formBuilder: FormBuilder,
    private router: Router) { }

  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  ngOnInit(): void {
    //localStorage.clear();
    //this.listUsers();
    this.insertLocalStorage()
  }

  insertLocalStorage(){
    const user: User = {userName: 'admin',
      password: 'admin',
      identification: '9999999999',
      roles: [{
        name: 'administrador'
      }]
    }
    const usersStorage: User[] = JSON.parse(localStorage.getItem('users')  || '[]');
    if (usersStorage.length === 0) {
      localStorage.setItem('users', JSON.stringify([user]))
    }
  }

  doLogin() {
    this.userName = this.loginForm.value.userName;
    this.password = this.loginForm.value.password;
    if (!this.userName) {
      alert('Debe ingresar un usuario');
      return;
    }
    if (!this.password) {
      alert('Debe ingresar una contraseña');
      return;
    }
    let userStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    userStorage = [...userStorage]
    const users = userStorage.find(user => user.userName === this.userName && user.password === this.password)
    

    if (!users) {
      alert('Usuario no encontrado');
      return;
    } else {
      const role = users.roles.find(rol => rol.name === 'administrador')
      localStorage.setItem('usuario', users.identification);
      if (role) {
        this.router.navigate(['employee-list'])
      } else {
        this.router.navigate(['employee'])
      }
      
    }

  }

}

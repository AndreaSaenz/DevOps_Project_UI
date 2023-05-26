import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  user: any = {};

  constructor(private userAuth: UserServicesService, private router: Router) {}

  ngOnInit() {}

  logIn(form: NgForm) {
    //console.log(form.value);
    //console.log(this.user);
    this.userAuth.logInUser(this.user).subscribe((res) => {
      //console.log(this.user);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/main/students']);
    });
  }
  /*
  logIn2(form: NgForm){
    console.log(form.value);
    console.log(this.user);
    console.log(JSON.stringify(form.value));
    console.log(JSON.stringify(this.user));
    this.userAuth.logInUser(form.value).subscribe({
      next: (val: any) => {
        console.log(val);
        console.log(val.token);
        localStorage.setItem('token', val.token);
        this.router.navigate(['/main/students']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });
  }
  */
}

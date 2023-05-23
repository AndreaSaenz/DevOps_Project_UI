import { Component, Input, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  user: any;

  constructor(private userAuth: UserServicesService, private router: Router) {}

  ngOnInit() {}

  logIn() {
    this.userAuth.logInUser(this.user).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/students']);
    });
  }
}

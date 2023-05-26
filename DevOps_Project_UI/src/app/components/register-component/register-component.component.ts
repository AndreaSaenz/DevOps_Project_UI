import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  user: any = {};

  constructor(private userAuth: UserServicesService, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.userAuth.registerNewUser(this.user).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/main/students']);
    });
  }
}

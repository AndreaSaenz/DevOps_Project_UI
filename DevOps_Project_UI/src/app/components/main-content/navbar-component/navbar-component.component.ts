import { Component } from '@angular/core';
import { UserServicesService } from '../../../services/user/user-services.service'

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent {

  constructor (public userService: UserServicesService) {}

  logOut(){};
}

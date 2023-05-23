import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private URL = 'http://localhost:3000/user';
  constructor(private http: HttpClient, private router: Router) {}

  registerNewUser(user: any) {
    return this.http.post<any>(this.URL + '/register', user);
  }

  logInUser(user: any) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

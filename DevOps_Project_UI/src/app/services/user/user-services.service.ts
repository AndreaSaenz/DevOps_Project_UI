import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {

  private URL = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) {}

  registerNewUser(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'})
    }
    return this.http.post<any>(this.URL + '/register', JSON.stringify(user), httpOptions);
  }

  logInUser(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'})
    }
    return this.http.post<any>(this.URL + '/login', JSON.stringify(user), httpOptions );
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

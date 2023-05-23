import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServicesService {

  private URL = 'http://localhost:3000/students'

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any> {
    return this.http.get(this.URL);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(this.URL + `/${id}`);
  }

  createStudent(data: any): Observable<any> {
    return this.http.post(this.URL, JSON.stringify(data));
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.http.put<any>( this.URL + `/${id}`, JSON.stringify(data));
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete( this.URL + `/${id}`);
  }
}

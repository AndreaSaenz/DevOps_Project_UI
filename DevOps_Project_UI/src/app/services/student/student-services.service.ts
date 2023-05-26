import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServicesService {

  private URL = 'http://localhost:3000/students'

  private refresh = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refreshNeeded(){
    return this.refresh;
  }

  getAllStudents(): Observable<any> {
    return this.http.get(this.URL);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(this.URL + `/${id}`);
  }

  createStudent(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
      })
    }
    return this.http.post(this.URL, JSON.stringify(data), httpOptions);
  }

  updateStudent(id: number, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
      })
    }
    return this.http.put<any>( this.URL + `/${id}`, JSON.stringify(data), httpOptions)
    .pipe(
      tap( () => {
        this.refresh.next();
      })
    );
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete( this.URL + `/${id}`)
    .pipe(
      tap( () => {
        this.refresh.next();
      })
    );
  }
  
}

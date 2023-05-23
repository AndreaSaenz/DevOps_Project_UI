import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerServicesService {

  private URL = 'http://localhost:3000/computers'

  constructor(private http: HttpClient) {}

  getAllComputers(): Observable<any> {
    return this.http.get(this.URL);
  }

  getComputerById(id: number): Observable<any> {
    return this.http.get(this.URL + `/${id}`);
  }

  createComputer(data: any): Observable<any> {
    return this.http.post(this.URL, JSON.stringify(data));
  }

  updateComputer(id: number, data: any): Observable<any> {
    return this.http.put<any>( this.URL + `/${id}`, JSON.stringify(data));
  }

  deleteComputer(id: number): Observable<any> {
    return this.http.delete( this.URL + `/${id}`);
  }
}

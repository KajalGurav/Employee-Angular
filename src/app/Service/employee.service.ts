import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL = 'https://localhost:44311/api/Customers';

  constructor(private http: HttpClient) { }

  get_Employees(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

  add_Employee(employee: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, employee);
  }

  update_Employee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, employee);
  }

  delete_Employee(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { responseType: 'text' });
  }
}

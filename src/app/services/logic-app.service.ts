import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICustomer } from '../pages/core/interfaces/customer-model.interface';

@Injectable({
  providedIn: 'root',
})
export class LogicAppService {
  private apiUrl = 'http://localhost:8080/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  login(password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${password}`).pipe(
      map((response) => {
        localStorage.setItem('customer', JSON.stringify(response));
        return response;
      }),
      catchError((error) => {
        localStorage.removeItem('customer');
        throw error;
      })
    );
  }

  getCustomerFromLocalStorage(): ICustomer {
    const customerData = localStorage.getItem('customer');
    return customerData ? JSON.parse(customerData) : null;
  }

  getAllFunds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funds`);
  }

  
  getCustomerFunds(customerId: any) {
    return this.http.get<any[]>(`${this.apiUrl}/funds/byUser/${customerId}`);
  }
}

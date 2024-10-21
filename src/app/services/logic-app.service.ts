import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICustomer } from '../pages/core/interfaces/customer-model.interface';

@Injectable({
  providedIn: 'root',
})
export class LogicAppService {
  private apiUrl = 'http://localhost:8080/api';
  private customerSubject = new BehaviorSubject<any>(this.getCustomerFromLocalStorage());

  constructor(private http: HttpClient) {}

  login(password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${password}`).pipe(
      map((response) => {
        this.setCustomerToLocalStorage(response);
        return response;
      }),
      catchError((error) => {
        localStorage.removeItem('customer');
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('customer');
  }

  getCustomerFromLocalStorage() {
    return JSON.parse(localStorage.getItem('currentCustomer') || '{}');
  }

  get customer() {
    return this.customerSubject.asObservable();
  }

  setCustomerToLocalStorage(customer: any) {
    localStorage.setItem('currentCustomer', JSON.stringify(customer));                
    this.customerSubject.next(customer); 
  }


  getAllFunds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funds`);
  }

  getCustomerFunds(customerId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funds/byUser/${customerId}`);
  }

  createAfiliation(requestBody: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/transactions/subscribe-to-fund`,
      requestBody
    );
  }

  cancelAfiliation(customerId: number, fundId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/transactions/cancel-subscription?customerId=${customerId}&fundId=${fundId}`,
      null
    );
  }
}

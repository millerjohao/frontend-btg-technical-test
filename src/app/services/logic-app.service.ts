import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogicAppService {
  private apiUrl = 'http://localhost:8080/api';

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
}

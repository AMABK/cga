import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const API_BASE = environment.apiUrl + 'transactions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(API_BASE,httpOptions);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${API_BASE}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_BASE, data,httpOptions);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${API_BASE}/${id}`, data,httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_BASE}/${id}`,httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_BASE,httpOptions);
  }

  findByPayerName(PayerName: any): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}?PayerName=${PayerName}`,httpOptions);
  }
  
  stkPush(PhoneNo: any,Amount: any,AccountRef: any){
	  let data: any = {PhoneNo: PhoneNo,Amount:Amount,AccountRef:AccountRef};
	  return this.http.post(environment.apiUrl + 'mpesa/stk-push',data,httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const API_BASE = environment.apiUrl + 'farmers-served';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmersServedService {

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

  findByDescription(Description: any): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}?Description=${Description}`,httpOptions);
  }
}

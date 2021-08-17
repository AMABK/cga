import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const API_BASE = environment.apiUrl + 'kpis';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(API_BASE,httpOptions);
  }  

  getByProgramme(args): Observable<any[]> {
	let filter = {where: {ProgrammeID:args.ProgrammeID, Year:args.Year}, limit:500};
    return this.http.get<any[]>(API_BASE + '?filter=' + JSON.stringify(filter),httpOptions);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${API_BASE}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_BASE, data,httpOptions);
  }  
  
  createMany(data: any[]): Observable<any> {
    return this.http.post(API_BASE + '/many', data,httpOptions);
  }  
  
  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${API_BASE}/${id}`, data,httpOptions);
  }  

  updateMany(data: any[]): Observable<any> {
	  return this.http.patch(API_BASE + '/many', data,httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_BASE}/${id}`,httpOptions);
  }
  
  deleteByProgramme(args): Observable<any> {
	let filter = {where: {ProgrammeID:args.ProgrammeID, Year:args.Year}};
    return this.http.delete(API_BASE + '?filter=' + JSON.stringify(filter),httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_BASE,httpOptions);
  }

}

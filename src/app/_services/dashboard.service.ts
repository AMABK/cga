import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const API_BASE = environment.apiUrl + 'dashboard';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getActivityDashboard(args:any): Observable<any[]> {
	let filter = {where: {ProgrammeID:args.ProgrammeID, Year:args.Year}};
	return this.http.get<any[]>(API_BASE + '/activity-tracker?filter=' + JSON.stringify(filter),httpOptions);
  }
  getTopStats(args?:any): Observable<any> {
    return this.http.get<any[]>(API_BASE + '/stats',httpOptions);
  }
  getMemberNumbersByCategory(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/member-numbers-category',httpOptions);
  }
  getMemberSubscriptionByCategory(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/members-subscription-category',httpOptions);
  }
  getMembersRecruitedByAgents(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/members-recruitment-agents',httpOptions);
  }
  getNoAgreiprenuers(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/agriprenuer-count',httpOptions);
  }
  getNoInputSold(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/no-input-sold',httpOptions);
  }
  getCropAggregation(Year?:any): Observable<any> {
	return this.http.get<any[]>(API_BASE + '/crop-aggregation',httpOptions);
  }
}

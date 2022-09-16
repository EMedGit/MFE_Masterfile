import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CivilStatus } from '../models/civilstatus.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class CivilstatusService {
  CivilStatus: CivilStatus[];
  constructor(private http: HttpClient) { }

  getCivilStatus(): Observable<CivilStatus[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<CivilStatus[]>(`${environment.masterfileAPI}/civilStatus`, { params })
  }
  GetCivilStatustByCode(HF_CODE: string): Observable<CivilStatus[]> {
    const params = new HttpParams()
      .set('Code', HF_CODE)
      .set('Page', 0)
      .set('ItemsPerPage', 999);
    return this.http.get<CivilStatus[]>(`${environment.masterfileAPI}/civilStatus`, { params });
  }
  postCivilStatus(data : CivilStatus) : Observable<CivilStatus>{
    return this.http.post<CivilStatus>(`${environment.masterfileAPI}/civilStatus/`, data, httpOptions);
  }
  putCivilStatus(id: number, data : CivilStatus) : Observable<CivilStatus>{
    return this.http.put<CivilStatus>(`${environment.masterfileAPI}/civilStatus/${id}`, data, httpOptions);
  }
  deleteCivilStatus(id: number) : Observable<any>{
    return this.http.delete<CivilStatus>(`${environment.masterfileAPI}/civilStatus/${id}`, httpOptions);
  }
  batchdeleteCivilStatus(data: CivilStatus[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/civilStatus/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiefComplaint } from '../models/chiefcomplaint.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ChiefcomplaintService {

  constructor(private http : HttpClient) { }
  getChiefcomplaint(): Observable<ChiefComplaint[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<ChiefComplaint[]>(`${environment.masterfileAPI}/chiefComplaint`, { params })
  }
  GetChiefComplaintByCode(HF_CODE: string): Observable<ChiefComplaint[]> {
    const params = new HttpParams()
      .set('Code', HF_CODE)
      .set('Page', 0)
      .set('ItemsPerPage', 999);
    return this.http.get<ChiefComplaint[]>(`${environment.masterfileAPI}/chiefComplaint`, { params });
  }
  postChiefcomplaint(data : ChiefComplaint) : Observable<ChiefComplaint>{
    return this.http.post<ChiefComplaint>(`${environment.masterfileAPI}/chiefComplaint/`, data, httpOptions);
  }
  putChiefcomplaint(id: number, data : ChiefComplaint) : Observable<ChiefComplaint>{
    return this.http.put<ChiefComplaint>(`${environment.masterfileAPI}/chiefComplaint/${id}`, data, httpOptions);
  }
  deleteChiefcomplaint(id: number) : Observable<any>{
    return this.http.delete<ChiefComplaint>(`${environment.masterfileAPI}/chiefComplaint/${id}`, httpOptions);
  }
  batchdeleteChiefcomplaint(data: ChiefComplaint[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/chiefComplaint/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

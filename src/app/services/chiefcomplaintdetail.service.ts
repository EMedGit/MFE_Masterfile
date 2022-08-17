import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiefComplaintDetail } from '../models/chiefcomplaintdetail.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ChiefcomplaintdetailService {

  constructor(private http : HttpClient) { }
  getChiefcomplaintdetail(): Observable<ChiefComplaintDetail[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<ChiefComplaintDetail[]>(`${environment.masterfileAPI}/chiefComplaintDetail`, { params })
  }
  postChiefcomplaintdetail(data : ChiefComplaintDetail) : Observable<ChiefComplaintDetail>{
    return this.http.post<ChiefComplaintDetail>(`${environment.masterfileAPI}/chiefComplaintDetail/`, data, httpOptions);
  }
  putChiefcomplaintdetail(id: number, data : ChiefComplaintDetail) : Observable<ChiefComplaintDetail>{
    return this.http.put<ChiefComplaintDetail>(`${environment.masterfileAPI}/chiefComplaintDetail/${id}`, data, httpOptions);
  }
  deleteChiefcomplaintdetail(id: number) : Observable<any>{
    return this.http.delete<ChiefComplaintDetail>(`${environment.masterfileAPI}/chiefComplaintDetail/${id}`, httpOptions);
  }
  batchdeleteChiefcomplaintdetail(data: ChiefComplaintDetail[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/chiefComplaintDetail/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

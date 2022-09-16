import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consultationtype } from '../models/consultationtype.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ConsultationtypeService {

  constructor(private http : HttpClient) { }
  getConsultationTypeList() : Observable<Consultationtype[]> {
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<Consultationtype[]>(`${environment.masterfileAPI}/consultationType`, { params })
  }
  GetConsultationTypeByCode(HF_CODE: string): Observable<Consultationtype[]> {
    const params = new HttpParams()
      .set('Code', HF_CODE)
      .set('Page', 0)
      .set('ItemsPerPage', 999);
    return this.http.get<Consultationtype[]>(`${environment.masterfileAPI}/consultationType`, { params });
  }
  postConsultationType(data : Consultationtype) : Observable<Consultationtype>{
    return this.http.post<Consultationtype>(`${environment.masterfileAPI}/consultationType/`, data, httpOptions);
  }
  putConsultationType(id : number, data : Consultationtype) : Observable<Consultationtype>{
    return this.http.put<Consultationtype>(`${environment.masterfileAPI}/consultationType/${id}`, data, httpOptions);
  }
  deleteConsultationType(id : number) : Observable<any>{
    return this.http.delete<Consultationtype>(`${environment.masterfileAPI}/consultationType/${id}`, httpOptions)
  }
  batchdeleteConsultationType(data : Consultationtype[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/consultationType/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

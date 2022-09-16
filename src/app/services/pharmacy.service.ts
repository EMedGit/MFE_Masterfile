import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pharmacy } from '../models/pharmacy.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http : HttpClient) { }
  getPharmacyService(): Observable<Pharmacy[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<Pharmacy[]>(`${environment.masterfileAPI}/pharmacy`, { params })
  }
  GetPharmacyByCode(HF_CODE: string): Observable<Pharmacy[]> {
    const params = new HttpParams()
        .set('Code', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<Pharmacy[]>(`${environment.masterfileAPI}/pharmacy`, { params });
  }
  postPharmacyService(data : Pharmacy) : Observable<Pharmacy>{
    return this.http.post<Pharmacy>(`${environment.masterfileAPI}/pharmacy/`, data, httpOptions);
  }
  putPharmacyService(id: number, data : Pharmacy) : Observable<Pharmacy>{
    return this.http.put<Pharmacy>(`${environment.masterfileAPI}/pharmacy/${id}`, data, httpOptions);
  }
  deletePharmacyService(id: number) : Observable<any>{
    return this.http.delete<Pharmacy>(`${environment.masterfileAPI}/pharmacy/${id}`, httpOptions);
  }
  batchdeletePharmacyService(data: Pharmacy[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/pharmacy/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

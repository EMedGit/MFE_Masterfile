import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Laboratory } from '../models/laboratory.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http : HttpClient) { }
  getLaboratory(): Observable<Laboratory[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<Laboratory[]>(`${environment.masterfileAPI}/laboratory`, { params })
  }
  postLaboratory(data : Laboratory) : Observable<Laboratory>{
    return this.http.post<Laboratory>(`${environment.masterfileAPI}/laboratory/`, data, httpOptions);
  }
  putLaboratory(id: number, data : Laboratory) : Observable<Laboratory>{
    return this.http.put<Laboratory>(`${environment.masterfileAPI}/laboratory/${id}`, data, httpOptions);
  }
  deleteLaboratory(id: number) : Observable<any>{
    return this.http.delete<Laboratory>(`${environment.masterfileAPI}/laboratory/${id}`, httpOptions);
  }
  batchdeleteLaboratory(data: Laboratory[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/laboratory/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

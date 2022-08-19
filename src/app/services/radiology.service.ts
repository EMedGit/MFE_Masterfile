import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Radiology } from '../models/radiology.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class RadiologyService {

  constructor(private http : HttpClient) { }
  getRadiology(): Observable<Radiology[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<Radiology[]>(`${environment.masterfileAPI}/radiology`, { params })
  }
  postRadiology(data : Radiology) : Observable<Radiology>{
    return this.http.post<Radiology>(`${environment.masterfileAPI}/radiology/`, data, httpOptions);
  }
  putRadiology(id: number, data : Radiology) : Observable<Radiology>{
    return this.http.put<Radiology>(`${environment.masterfileAPI}/radiology/${id}`, data, httpOptions);
  }
  deleteRadiology(id: number) : Observable<any>{
    return this.http.delete<Radiology>(`${environment.masterfileAPI}/radiology/${id}`, httpOptions);
  }
  batchdeleteRadiology(data: Radiology[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/radiology/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

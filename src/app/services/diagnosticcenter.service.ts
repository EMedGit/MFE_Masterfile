import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiagnosticCenter } from '../models/diagnosticcenter.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class DiagnosticcenterService {

  constructor(private http : HttpClient) { }
  getDiagnosticCenter(): Observable<DiagnosticCenter[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<DiagnosticCenter[]>(`${environment.masterfileAPI}/diagnosticCenter`, { params })
  }
  postDiagnosticCenter(data : DiagnosticCenter) : Observable<DiagnosticCenter>{
    return this.http.post<DiagnosticCenter>(`${environment.masterfileAPI}/diagnosticCenter/`, data, httpOptions);
  }
  putDiagnosticCenter(id: number, data : DiagnosticCenter) : Observable<DiagnosticCenter>{
    return this.http.put<DiagnosticCenter>(`${environment.masterfileAPI}/diagnosticCenter/${id}`, data, httpOptions);
  }
  deleteDiagnosticCenter(id: number) : Observable<any>{
    return this.http.delete<DiagnosticCenter>(`${environment.masterfileAPI}/diagnosticCenter/${id}`, httpOptions);
  }
  batchdeleteDiagnosticCenter(data: DiagnosticCenter[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/diagnosticCenter/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

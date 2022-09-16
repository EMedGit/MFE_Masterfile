import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AncillaryDepartment } from '../models/ancillarydepartment.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AncillarydepartmentService {

  constructor(private http: HttpClient) { }
  getAncillaryDepartment(): Observable<AncillaryDepartment[]> {
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<AncillaryDepartment[]>(`${environment.masterfileAPI}/ancillaryDepartment`, { params })
  }
  GetAncillaryDepartmentByCode(HF_CODE: string): Observable<AncillaryDepartment[]> {
    const params = new HttpParams()
      .set('Code', HF_CODE)
      .set('Page', 0)
      .set('ItemsPerPage', 999);
    return this.http.get<AncillaryDepartment[]>(`${environment.masterfileAPI}/ancillaryDepartment`, { params });
  }
  postAncillaryDepartment(data: AncillaryDepartment): Observable<AncillaryDepartment> {
    return this.http.post<AncillaryDepartment>(`${environment.masterfileAPI}/ancillaryDepartment/`, data, httpOptions);
  }
  putAncillaryDepartment(id: number, data: AncillaryDepartment): Observable<AncillaryDepartment> {
    return this.http.put<AncillaryDepartment>(`${environment.masterfileAPI}/ancillaryDepartment/${id}`, data, httpOptions);
  }
  deleteAncillaryDepartment(id: number): Observable<any> {
    return this.http.delete<AncillaryDepartment>(`${environment.masterfileAPI}/ancillaryDepartment/${id}`, httpOptions);
  }
  batchdeleteAncillaryDepartment(data: AncillaryDepartment[]): Observable<boolean> {
    const url = `${environment.masterfileAPI}/ancillaryDepartment/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

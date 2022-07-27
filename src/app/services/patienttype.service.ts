import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientType } from '../models/patienttype.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class PatienttypeService {
  PatientType : PatientType[];
  constructor(private http : HttpClient) { }

  getPatientType() : Observable<PatientType[]> {
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<PatientType[]>(`${environment.masterfileAPI}/patientType`, { params });
  }
  postPatientType(data : PatientType) : Observable<PatientType>{
    return this.http.post<PatientType>(`${environment.masterfileAPI}/patientType/`, data, httpOptions);
  }
  putPatientType(id : number, data : PatientType) : Observable<PatientType>{
    return this.http.put<PatientType>(`${environment.masterfileAPI}/patientType/${id}`, data, httpOptions);
  }
  deletePatientType(id : number) : Observable<any>{
    return this.http.delete<PatientType>(`${environment.masterfileAPI}/patientType/${id}`, httpOptions);
  }
  batchdeletePatientType(data : PatientType[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/patientType/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

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
  postCivilStatus(data : CivilStatus) : Observable<CivilStatus>{
    const params = new HttpParams()      
    .set('Code ', data.code)
    .set('Description', data.description);
    const url = `${environment.masterfileAPI}/civilStatus`;
    return this.http.post<CivilStatus>(url, { params }, httpOptions);
  }

}

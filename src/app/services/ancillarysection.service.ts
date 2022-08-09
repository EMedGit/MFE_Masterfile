import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AncillarySection } from '../models/ancillarysection.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AncillarysectionService {

  constructor(private http : HttpClient) { }
  getAncillarySection(): Observable<AncillarySection[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<AncillarySection[]>(`${environment.masterfileAPI}/ancillarySection`, { params })
  }
  postAncillarySection(data : AncillarySection) : Observable<AncillarySection>{
    return this.http.post<AncillarySection>(`${environment.masterfileAPI}/ancillarySection/`, data, httpOptions);
  }
  putAncillarySection(id: number, data : AncillarySection) : Observable<AncillarySection>{
    return this.http.put<AncillarySection>(`${environment.masterfileAPI}/ancillarySection/${id}`, data, httpOptions);
  }
  deleteAncillarySection(id: number) : Observable<any>{
    return this.http.delete<AncillarySection>(`${environment.masterfileAPI}/ancillarySection/${id}`, httpOptions);
  }
  batchdeleteAncillarySection(data: AncillarySection[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/ancillarySection/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferralCategory } from '../models/referralcategory.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ReferralcategoryService {

  constructor(private http : HttpClient) { }
  getReferralcategory(): Observable<ReferralCategory[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<ReferralCategory[]>(`${environment.masterfileAPI}/referralCategory`, { params })
  }
  GetReferralCategoryByCode(HF_CODE: string): Observable<ReferralCategory[]> {
    const params = new HttpParams()
        .set('Code', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<ReferralCategory[]>(`${environment.masterfileAPI}/referralCategory`, { params });
  }
  postReferralcategory(data : ReferralCategory) : Observable<ReferralCategory>{
    return this.http.post<ReferralCategory>(`${environment.masterfileAPI}/referralCategory/`, data, httpOptions);
  }
  putReferralcategory(id: number, data : ReferralCategory) : Observable<ReferralCategory>{
    return this.http.put<ReferralCategory>(`${environment.masterfileAPI}/referralCategory/${id}`, data, httpOptions);
  }
  deleteReferralcategory(id: number) : Observable<any>{
    return this.http.delete<ReferralCategory>(`${environment.masterfileAPI}/referralCategory/${id}`, httpOptions);
  }
  batchdeleteReferralcategory(data: ReferralCategory[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/referralCategory/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

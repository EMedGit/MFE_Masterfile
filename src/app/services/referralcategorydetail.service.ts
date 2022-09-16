import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferralCategoryDetail } from '../models/referralcategorydetail.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ReferralcategorydetailService {

  constructor(private http : HttpClient) { }
  getReferralcategorydetail(): Observable<ReferralCategoryDetail[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999999);
    return this.http.get<ReferralCategoryDetail[]>(`${environment.masterfileAPI}/referralCategoryDetail`, { params })
  }
  GetReferralCategoryDetailByDescription(HF_CODE: string): Observable<ReferralCategoryDetail[]> {
    const params = new HttpParams()
        .set('ReferralCategoryDescription', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<ReferralCategoryDetail[]>(`${environment.masterfileAPI}/referralCategoryDetail`, { params });
  }
  postReferralcategorydetail(data : ReferralCategoryDetail) : Observable<ReferralCategoryDetail>{
    return this.http.post<ReferralCategoryDetail>(`${environment.masterfileAPI}/referralCategoryDetail/`, data, httpOptions);
  }
  putReferralcategorydetail(id: number, data : ReferralCategoryDetail) : Observable<ReferralCategoryDetail>{
    return this.http.put<ReferralCategoryDetail>(`${environment.masterfileAPI}/referralCategoryDetail/${id}`, data, httpOptions);
  }
  deleteReferralcategorydetail(id: number) : Observable<any>{
    return this.http.delete<ReferralCategoryDetail>(`${environment.masterfileAPI}/referralCategoryDetail/${id}`, httpOptions);
  }
  batchdeleteReferralcategorydetail(data: ReferralCategoryDetail[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/referralCategoryDetail/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}

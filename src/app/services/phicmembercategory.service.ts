import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phicmembercategory } from '../models/phicmembercategory.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class PhicmembercategoryService {

  constructor(private http : HttpClient) { }
  getPhicmembercategoryList() : Observable<Phicmembercategory[]> {
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<Phicmembercategory[]>(`${environment.masterfileAPI}/phicmemberCategory`, { params })
  }
  GetPHICMemberCategoryByCode(HF_CODE: string): Observable<Phicmembercategory[]> {
    const params = new HttpParams()
        .set('Code', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<Phicmembercategory[]>(`${environment.masterfileAPI}/phicmemberCategory`, { params });
  }
  postPhicmembercategory(data : Phicmembercategory) : Observable<Phicmembercategory>{
    return this.http.post<Phicmembercategory>(`${environment.masterfileAPI}/phicmemberCategory/`, data, httpOptions);
  }
  putPhicmembercategory(id : number, data : Phicmembercategory) : Observable<Phicmembercategory>{
    return this.http.put<Phicmembercategory>(`${environment.masterfileAPI}/phicmemberCategory/${id}`, data, httpOptions);
  }
  deletePhicmembercategory(id : number) : Observable<any>{
    return this.http.delete<Phicmembercategory>(`${environment.masterfileAPI}/phicmemberCategory/${id}`, httpOptions)
  }
  batchdeletePhicmembercategory(data : Phicmembercategory[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/phicmemberCategory/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}
